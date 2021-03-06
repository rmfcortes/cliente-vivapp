import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Chofer, Pedido } from 'src/app/interfaces/compra.interface';
import { CompraService } from 'src/app/services/compra.service';
import { ChatPage } from '../chat/chat.page';
import { qrEnterAnimation } from 'src/app/animations/qrEnter';
import { qrLeaveAnimation } from 'src/app/animations/qrLeave';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { UidService } from 'src/app/services/uid.service';
import { PermisoPage } from '../permiso/permiso.page';
import { FcmService } from 'src/app/services/fcm.service';

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
  msgSub: Subscription;
  choferSub: Subscription;

  tel: string;
  telReady = true;

  calificacion = {
    puntos: 5,
    comentarios: '',
    vendedor: '',
    nombre: ''
  };

  calPend = false;

  newMsg = false;
  pedidOff = false;

  hasPermission = false;

  constructor(
    private ngZone: NgZone,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private compraService: CompraService,
    private chatService: ChatService,
    private fcmService: FcmService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getChofer();
    this.checkNotifications();
  }

  ionViewDidEnter() {
    this.getTelefono();
    this.pedidoDeleted();
  }

  async checkNotifications() {
    if (Notification.permission !== 'granted') {
      this.hasPermission = false;
    } else {
      await this.fcmService.requestToken();
      this.hasPermission = true;
    }
  }

  async getTelefono() {
    this.tel = await this.compraService.getTelefono();
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
    if (!this.pedido.chofer) {
        this.listenChofer();
    } else {
      this.chofer = this.pedido.chofer;
      if (!this.chofer.foto) {
        this.chofer.foto = '../../../assets/img/chofer.png';
      }
      this.choferReady = true;
      this.getStatus();
      this.getUbicacion();
      this.listenNewMsg();
    }
  }

  pedidoDeleted() {
    if (this.pedidOff) {
      return;
    }
    this.pedidOff = true;
    this.compraService.pedidoRef().query.ref.on('child_removed', snapshot => {
      this.ngZone.run(() => {
        this.presentToast('El pedido fue eliminado por el administrador.');
        this.terminarPedido();
      });
    });
  }

  listenChofer() {
    const espSub = this.compraService.getChofer(this.pedido.id).subscribe((chofer: Chofer) => {
      if (!chofer) {
        return;
      }
      espSub.unsubscribe();
      this.chofer = chofer;
      if (!this.chofer.foto) {
        this.chofer.foto = '../../../assets/img/chofer.png';
      }
      this.choferReady = true;
      this.getStatus();
      this.listenNewMsg();
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
      if (!status) {
        return;
      }
      this.calPend = true;
      this.compraService.pedidoRef().query.ref.off('child_removed');
      this.stSub.unsubscribe();
      if (this.ubSub) { this.ubSub.unsubscribe(); }
      if (this.msgSub) { this.msgSub.unsubscribe(); }
      if (this.choferSub) { this.choferSub.unsubscribe(); }
      if (this.ubSub) { this.ubSub.unsubscribe(); }
      this.presentToast('Pedido Entregado. ¡¡Muchas gracias por su preferencia!!');
    });
  }

  listenNewMsg() {
    this.msgSub = this.chatService.newMsg(this.chofer.id).subscribe(async (msgPend: any) => {
      if (!msgPend) {
        this.newMsg = false;
        return;
      }
      this.newMsg = true;
      this.presentToast('Nuevo mensaje de ' + this.chofer.nombre);
    });
  }

  async guardarCalificacion() {
    this.calificacion.vendedor = this.chofer.id;
    this.calificacion.nombre = localStorage.getItem('nombre');
    await this.compraService.calificar(this.pedido.id, this.calificacion);
    this.calPend = false;
    this.terminarPedido();
  }

  async terminarPedido() {
    await this.compraService.pedidoCompletado();
    this.choferReady = false;
    this.pedido = null;
    this.regresar();
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

  async muestraPermisos() {
    const modal = await this.modalCtrl.create({
      enterAnimation: qrEnterAnimation,
      leaveAnimation: qrLeaveAnimation,
      component: PermisoPage,
      cssClass: 'my-custom-modal-css',
    });
    modal.onWillDismiss().then((resp) => {
      if (resp.data) {
        this.hasPermission = true;
        this.presentToast('¡Perfecto!, de ahora en adelante recibirás alertas respecto a tu pedido');
      }
    });
    return await modal.present();
  }

  regresar() {
    if (this.stSub) { this.stSub.unsubscribe(); }
    if (this.ubSub) { this.ubSub.unsubscribe(); }
    if (this.msgSub) { this.msgSub.unsubscribe(); }
    if (this.choferSub) { this.choferSub.unsubscribe(); }
    this.compraService.pedidoRef().query.ref.off('child_removed');
    this.modalCtrl.dismiss();
  }

  async presentToast(mensaje) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
