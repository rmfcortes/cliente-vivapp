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
  ubSub: Subscription;

  tel: string;
  telReady = true;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private compraService: CompraService,
  ) { }

  ngOnInit() {
    this.getChofer();
    this.getTelefono();
  }

  async getTelefono() {
    this.tel = await this.compraService.getTelefono();
    console.log(this.tel);
    if (!this.tel) {
      setTimeout(() => {
        this.telReady = false;
      }, 2000);
    }
  }

  onEnter() {
    if (!this.tel) {
      return;
    }
    this.compraService.guardarTelefono(this.tel);
    this.telReady = true;
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

  getUbicacion() {
    this.ubSub = this.compraService.getStatusPedido(this.pedido.id).subscribe(async (status: any) => {
      
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
      this.ubSub.unsubscribe();
    });
  }

  llamar() {
    console.log(this.chofer);
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
    if (this.ubSub) { this.ubSub.unsubscribe(); }
    this.modalCtrl.dismiss(resp);
  }

}
