import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController, ToastController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { QrPage } from 'src/app/modals/qr/qr.page';
import { MapaPage } from 'src/app/modals/mapa/mapa.page';
import { PedidoPage } from 'src/app/modals/pedido/pedido.page';

import { AuthService } from '../../services/auth.service';
import { CompraService } from 'src/app/services/compra.service';

import { EnterAnimation } from '../../animations/enter';
import { LeaveAnimation } from '../../animations/leave';
import { qrEnterAnimation } from '../../animations/qrEnter';
import { qrLeaveAnimation } from '../../animations/qrLeave';

import { Producto, Pedido, Chofer } from 'src/app/interfaces/compra.interface';
import { FcmService } from 'src/app/services/fcm.service';
import { ChatService } from 'src/app/services/chat.service';
import { UidService } from 'src/app/services/uid.service';
import { NetworkService } from 'src/app/services/network.service';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { LoginPage } from 'src/app/modals/login/login.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  pedido: Pedido;
  productos: Producto[];
  prodsReady = false;
  cuenta = 0;
  stSub: Subscription;
  horarioSub: Subscription;
  infoReady = false;
  status = '';
  horario = '';
  isOpen: boolean;

  calificacion = {
    puntos: 5,
    comentarios: '',
    vendedor: '',
    nombre: ''
  };

  avatar = '../../../assets/img/chofer.png';

  newMsg = false;
  msgSub: Subscription;
  choferSub: Subscription;

  pedidOff = false;

  isConnected = true;

  deferredPrompt: any;
  notInstalled = false;

  constructor(
    private ngZone: NgZone,
    private popController: PopoverController,
    private modalController: ModalController,
    private toastController: ToastController,
    private compraService: CompraService,
    private netService: NetworkService,
    private authService: AuthService,
    private chatService: ChatService,
    private fcmService: FcmService,
    private uidService: UidService,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getProds();
    this.getPedido();
    this.netService.checkNetStatus();
    this.netSub();
  }

  ionViewDidEnter() {
    if (Notification.permission === 'granted') {
      this.fcmService.requestToken();
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      // Stash the event so it can be triggered later.
      e.preventDefault();
      this.deferredPrompt = e;
      console.log(this.deferredPrompt);
    });
  }

  showPrompt() {
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice
      .then(function(choiceResult) {
      if (choiceResult.outcome === 'accepted') {
        this.deferredPrompt = null;
      }
    });
  }

  async getProds() {
    this.productos = await this.compraService.getProductos();
    this.prodsReady = true;
  }

  netSub() {
    this.netService.isConnected.subscribe(resp => {
      this.isConnected = resp;
    });
  }

  async getPedido() {
    this.pedido = await this.compraService.getPedido();
    if (this.pedido) {
      this.getStatus();
      this.listenChofer();
      this.pedidoDeleted();
    } else {
     this.getHorario();
    }
  }

  agregar(i) {
    if (this.pedido) {
      this.presentToast('Ya tienes un pedido en curso');
      return;
    }
    this.productos[i].cantidad = 1;
    this.cuenta += parseInt(this.productos[i].precio, 10);
  }

  quitar(i) {
    if (this.productos[i].cantidad === 0) {
      return;
    } else {
      this.productos[i].cantidad--;
      this.cuenta -= parseInt(this.productos[i].precio, 10);
    }
  }

  sumar(i) {
    this.productos[i].cantidad++;
    this.cuenta += parseInt(this.productos[i].precio, 10);
  }

  async mostrarQr() {
    const modal = await this.modalController.create({
      enterAnimation: qrEnterAnimation,
      leaveAnimation: qrLeaveAnimation,
      component: QrPage,
    });
    return await modal.present();
  }

  async verMapa() {
    const modal = await this.modalController.create({
      enterAnimation: EnterAnimation,
      leaveAnimation: LeaveAnimation,
      component: MapaPage,
      componentProps: {
        productos: this.productos,
        qr: false
      }
    });
    modal.onWillDismiss().then(() => {
      this.reIngresando();
    });
    return await modal.present();
  }

  async muestraPedido() {
    const modal = await this.modalController.create({
      enterAnimation: EnterAnimation,
      leaveAnimation: LeaveAnimation,
      component: PedidoPage,
      componentProps: {pedido: this.pedido}
    });
    modal.onWillDismiss().then(() => {
      this.reIngresando();
    });
    return await modal.present();
  }

  async settingsPopover(ev: any) {
    const popover = await this.popController.create({
      component: MenuComponent,
      event: ev,
      cssClass: 'popover_class',
    });

    popover.onWillDismiss().then((resp) => {
      if (resp.data) {
        switch (resp.data) {
          case 'qr':
            this.mostrarQr();
            break;
          case 'salir':
            this.salir();
            break;
          case 'login':
            this.muestraLogin();
            break;
        }
      }
    });
    return await popover.present();
  }

  async muestraLogin() {
    const modal = await this.modalController.create({
      enterAnimation: qrEnterAnimation,
      leaveAnimation: qrLeaveAnimation,
      component: LoginPage,
      cssClass: 'my-custom-modal-css'
    });
    modal.onWillDismiss().then((resp) => {
      if (resp.data) {

      }
    });
    return await modal.present();
  }

  justLogin() {
    this.infoReady = false;
    this.productos.forEach(p => {
      p.cantidad = 0;
    });
    this.cuenta = 0;
    this.getProds();
    this.getPedido();
    if (Notification.permission === 'granted') {
      this.fcmService.requestToken();
    }
  }

  reIngresando() {
    this.infoReady = false;
    this.productos.forEach(p => {
      p.cantidad = 0;
    });
    this.cuenta = 0;
    this.getPedido();
  }

  // Auxiliares

  async getHorario() {
    return new Promise((resolve, reject) => {
      if (this.horarioSub) {
        this.infoReady = true;
        return resolve();
      }
      this.horarioSub = this.compraService.isOpen().subscribe(async (abierto: boolean) => {
        this.isOpen = abierto;
        this.infoReady = true;
        if (!this.isOpen) {
          this.status = 'cerrado';
          this.horario = await this.compraService.getHorario();
        } else {
          this.status = 'listo';
          this.infoReady = true;
        }
        resolve();
      });
    });
  }

  getStatus() {
    if (this.stSub) { return; }
    this.stSub = this.compraService.getStatusPedido(this.pedido.id).subscribe(async (status) => {
      this.infoReady = true;
      if (!status) {
        this.status = 'pedido';
        return;
      }
      this.compraService.pedidoRef().query.ref.off('child_removed');
      if (!this.pedido.chofer.foto) { this.pedido.chofer.foto = this.avatar; }
      this.status = 'calificar';
      this.stSub.unsubscribe();
      if (this.msgSub) { this.msgSub.unsubscribe(); }
      if (this.choferSub) { this.choferSub.unsubscribe(); }
      this.presentToast('Pedido Entregado. ¡¡Muchas gracias por su preferencia!!');
    });
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
    this.choferSub = this.compraService.getChofer(this.pedido.id).subscribe((chofer: Chofer) => {
      if (!chofer) {
        return;
      }
      this.pedido.chofer = chofer;
      if (!this.pedido.chofer.foto) {
        this.pedido.chofer.foto = '../../../assets/img/chofer.png';
      }
      this.listenNewMsg();
    });
  }

  listenNewMsg() {
    if (this.msgSub) { return; }
    this.msgSub = this.chatService.newMsg(this.pedido.chofer.id).subscribe(async (msgPend: any) => {
      if (!msgPend) {
        this.newMsg = false;
        return;
      }
      this.newMsg = true;
      this.presentToast('Nuevo mensaje de ' + this.pedido.chofer.nombre);
    });
  }

  async guardarCalificacion() {
    this.calificacion.vendedor = this.pedido.chofer.id;
    this.calificacion.nombre = await this.uidService.getNombre();
    await this.compraService.calificar(this.pedido.id, this.calificacion);
    this.terminarPedido();
  }

  async terminarPedido() {
    await this.compraService.pedidoCompletado();
    if (!this.horarioSub) {
      await this.getHorario();
    } else {
      if (!this.isOpen) {
        this.status = 'cerrado';
        this.horario = await this.compraService.getHorario();
      } else {
        this.status = 'listo';
        this.infoReady = true;
      }
    }
    this.pedido = null;
  }

  async salir() {
    try {
      this.pedido = null;
      this.productos = [];
      this.cuenta = 0;
      this.infoReady = false;
      this.status = '';
      this.horario = '';
      this.newMsg = false;
      this.pedidOff = false;
      this.prodsReady = false;
      if (this.stSub) {
        this.stSub.unsubscribe();
        this.stSub = null;
      }
      if (this.horarioSub) {
        this.horarioSub.unsubscribe();
        this.horarioSub = null;
      }
      if (this.msgSub) {
        this.msgSub.unsubscribe();
        this.msgSub = null;
      }
      if (this.choferSub) {
        this.choferSub.unsubscribe();
        this.choferSub = null;
      }
      this.compraService.pedidoRef().query.ref.off('child_removed');
      this.fcmService.unsubscribeMensajes();
      await this.authService.logout();
      this.getProds();
    } catch (error) {
      console.log(error);
    }
  }

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

}
