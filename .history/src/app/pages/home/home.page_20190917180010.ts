import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

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
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  pedido: Pedido;

  productos: Producto[];

  cuenta = 0;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private compraService: CompraService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getProds();
  }

  async getProds() {
    this.productos = await this.compraService.getProductos();
  }

  ionViewWillEnter() {
    this.pedido = JSON.parse(localStorage.getItem('pedido'));
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
      componentProps: { productos: this.productos}
    });
    modal.onWillDismiss().then(resp => {
      this.productos.forEach(p => {
        p.cantidad = 0;
      });
      console.log('Modal resp' + resp.data);
      if (resp.data) {
        this.presentToast('Pedido entregado. Gracias por su preferencia');
      }
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
    modal.onWillDismiss().then(resp => {
      this.productos.forEach(p => {
        p.cantidad = 0;
      });
      console.log('Modal resp' + resp.data);
      if (resp.data) {
        this.presentToast('Pedido entregado. Gracias por su preferencia');
      }
    });
    return await modal.present();
  }

  // Auxiliares

  async salir() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
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
