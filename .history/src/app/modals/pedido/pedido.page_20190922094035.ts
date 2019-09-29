import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Chofer, Pedido } from 'src/app/interfaces/compra.interface';
import { CompraService } from 'src/app/services/compra.service';
import { ChatPage } from '../chat/chat.page';
import { qrEnterAnimation } from 'src/app/animations/qrEnter';
import { qrLeaveAnimation } from 'src/app/animations/qrLeave';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  @Input() pedido: Pedido;

  chofer: Chofer = {
    nombre: '',
    telefono: '',
    foto: '../../../assets/img/chofer.png',
    lat: 0,
    lng: 0,
    id: ''
  };

  choferReady = false;

  icon = '../../../assets/img/pin.png';
  truck = '../../../assets/img/truck.png';

  zoom = 15;

  stSub: Subscription;

  tel: string;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private compraService: CompraService,
  ) { }

  ngOnInit() {
    this.getChofer();
  }

  async getTelefono() {
    this.tel = await this.compraService.getTelefono();
    (!this.tel) {

    }
  }

  getChofer() {
    const chofer = JSON.parse(localStorage.getItem('chofer'));
    if (chofer) {
      this.chofer = chofer;
      this.choferReady = true;
      this.getStatus();
    } else {
      this.escucharCambios();
    }
  }

  escucharCambios() {
    const espSub = this.compraService.esperando(this.pedido.id).subscribe((chofer: any) => {
      if (!chofer) {
        return;
      }
      this.chofer = chofer;
      if (!this.chofer.foto) {
        this.chofer.foto = '../../../assets/img/chofer.png';
      }
      this.choferReady = true;
      localStorage.setItem('chofer', JSON.stringify(chofer));
      espSub.unsubscribe();
      this.getStatus();
    });
  }

  getStatus() {
    this.stSub = this.compraService.getStatusPedido(this.pedido.id).subscribe(async (status: any) => {
      if (status) {
        return;
      }
      localStorage.removeItem('chofer');
      this.choferReady = false;
      this.pedido = null;
      this.regresar(true);
      this.stSub.unsubscribe();
    });
  }

  llamar() {
    window.open(`tel:${this.chofer.telefono}`, '_system');
  }

  async muestraChat() {
    const modal = await this.modalCtrl.create({
      component: ChatPage,
      enterAnimation: qrEnterAnimation,
      leaveAnimation: qrLeaveAnimation,
      componentProps: {
        idVendedor: this.chofer.id,
        idPedido: this.pedido.id
      }
    });
    return await modal.present();
  }

  regresar(resp) {
    if (this.stSub) { this.stSub.unsubscribe(); }
    this.modalCtrl.dismiss(resp);
  }

  async presentTelPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Teléfono de contacto',
      message: 'Mientras esperas tu pedido, por favor dinos un teléfono de contacto',
      inputs: [
        {
          name: 'telefono',
          type: 'tel',
          placeholder: 'Sin espacios ej. 4581188913'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.tel = data.telefono;
            this.shareViaWhatsApp(data.telefono);
          }
        }
      ]
    });

    await alert.present();
  }


}
