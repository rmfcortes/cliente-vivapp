import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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

  calificacion = {
    puntos: 5,
    comentarios: ''
  };
  calPend = false;

  constructor(
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
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

  guardaTel(event?) {
    if (event) {
      event.target.blur();
    }
    if (!this.tel) {
      return;
    }
    this.compraService.guardarTelefono(this.tel);
    this.presentToast('Teléfono guardado. ¡Muchas gracias!');
    this.telReady = true;
  }

  getChofer() {
    const chofer = JSON.parse(localStorage.getItem('chofer'));
    if (chofer) {
      this.chofer = chofer;
      this.choferReady = true;
      this.getStatus();
      this.getUbicacion();
    } else {
      this.escucharCambios();
    }
  }

  escucharCambios() {
    const espSub = this.compraService.esperando(this.pedido.id).subscribe((chofer: any) => {
      if (!chofer) {
        return;
      }
      espSub.unsubscribe();
      this.chofer = chofer;
      if (!this.chofer.foto) {
        this.chofer.foto = '../../../assets/img/chofer.png';
      }
      this.choferReady = true;
      localStorage.setItem('chofer', JSON.stringify(chofer));
      this.getStatus();
    });
  }

  getUbicacion() {
    this.ubSub = this.compraService.getUbicacionChofer(this.chofer.id).subscribe(async (coords: any) => {
      this.chofer.lat = coords.lat;
      this.chofer.lng = coords.lng;
    });
  }

  getStatus() {
    this.stSub = this.compraService.getStatusPedido(this.pedido.id).subscribe(async (status: any) => {
      console.log(status);
      if (!status) {
        return;
      }
      this.terminarPedido();
    });
  }

  terminarPedido() {
    this.choferReady = false;
    this.pedido = null;
    if (this.stSub) { this.stSub.unsubscribe(); }
    if (this.ubSub) { this.ubSub.unsubscribe(); }
    this.calPend = true;
  }

  guardarCalificacion() {
    // info en calificacion .puntos y .comentario
    // Guardar comentario en BD
    localStorage.removeItem('chofer');
    this.regresar(true);
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

  async presentToast(mensaje) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
