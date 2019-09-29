import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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

import { Producto, Pedido } from 'src/app/interfaces/compra.interface';
import { FcmService } from 'src/app/services/fcm.service';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  pedido: Pedido;
  productos: Producto[];
  cuenta = 0;
  stSub: Subscription;
  horarioSub: Subscription;
  infoReady = false;
  status = '';
  horario = '';

  calificacion = {
    puntos: 5,
    comentarios: ''
  };

  avatar = '../../../assets/img/chofer.png';

  newMsg = false;
  msgSub: Subscription;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private compraService: CompraService,
    private authService: AuthService,
    private chatService: ChatService,
    private fcmService: FcmService,
  ) { }

  ngOnInit() {
    this.getProds();
    this.fcmService.escuchaMensajes();
  }

  async getProds() {
    this.productos = await this.compraService.getProductos();
  }

  ionViewWillEnter() {
    this.getPedido();
  }

  async getPedido() {
    this.pedido = await this.compraService.getPedido();
    console.log(this.pedido);
    if (this.pedido) {
      this.getStatus();
      this.listenNewMsg();
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
    this.cuenta += this.productos[i].precio;
  }

  quitar(i) {
    if (this.productos[i].cantidad === 0) {
      return;
    } else {
      this.productos[i].cantidad--;
      this.cuenta -= this.productos[i].precio;
    }
  }

  sumar(i) {
    this.productos[i].cantidad++;
    this.cuenta += this.productos[i].precio;
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
      this.horarioSub = this.compraService.isOpen().subscribe(async (abierto: boolean) => {
        console.log(abierto);
        this.infoReady = true;
        if (!abierto) {
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
    this.stSub = this.compraService.getStatusPedido(this.pedido.id).subscribe(async (status) => {
      this.infoReady = true;
      if (!status) {
        this.status = 'pedido';
        return;
      }
      if (!this.pedido.chofer.foto) { this.pedido.chofer.foto = this.avatar; }
      this.status = 'calificar';
      this.stSub.unsubscribe();
      this.presentToast('Pedido Entregado. ¡¡Muchas gracias por su preferencia!!');
    });
  }

  listenNewMsg() {
    this.msgSub = this.chatService.newMsg(this.pedido.chofer.id).subscribe(async (msgPend: any) => {
      console.log(msgPend);
      if (!msgPend) {
        this.newMsg = false;
        return;
      }
      this.newMsg = true;
      this.presentToast('Nuevo mensaje de ' + this.pedido.chofer.nombre);
    });
  }

  guardarCalificacion() {
    this.compraService.calificar(this.pedido.id, this.calificacion);
    this.terminarPedido();
  }

  terminarPedido() {
    this.compraService.pedidoCompletado();
    this.pedido = null;
    this.getHorario();
  }

  async salir() {
    try {
      if (this.stSub) { this.stSub.unsubscribe(); }
      if (this.horarioSub) { this.horarioSub.unsubscribe(); }
      if (this.msgSub) { this.msgSub.unsubscribe(); }
      this.fcmService.unsubscribeMensajes();
      await this.authService.logout();
      this.router.navigate(['login']);
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
