import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Direccion, ProductoPedido, Pedido } from 'src/app/interfaces/compra.interface';
import { CompraService } from 'src/app/services/compra.service';
import { DireccionesModalPage } from '../direcciones-modal/direcciones-modal.page';
import { EnterAnimation } from 'src/app/animations/enter';
import { LeaveAnimation } from 'src/app/animations/leave';
import { PedidoPage } from '../pedido/pedido.page';
import { qrEnterAnimation } from 'src/app/animations/qrEnter';
import { qrLeaveAnimation } from 'src/app/animations/qrLeave';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  @Input() productos;

  direccion: Direccion = {
    lat: 20.622894,
    lng: -103.415830,
    direccion: ''
  };

  zoom = 14;
  dirReady = false;

  icon = '../../../assets/img/pin.png';

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private compraService: CompraService,
  ) { }

  ngOnInit() {
    console.log(this.productos);
    this.getDireccion();
  }

  async getDireccion() {
    const dir: Direccion = await this.compraService.getUltimaDireccion();
    if (dir) {
      this.direccion = dir;
      this.dirReady = true;
      this.zoom = 15;
    }
  }

  async muestraDirecciones() {
    const modal = await this.modalController.create({
      component: DireccionesModalPage,
      enterAnimation: qrEnterAnimation,
      leaveAnimation: qrLeaveAnimation,
      componentProps: { direccion: this.direccion }
    });
    modal.onDidDismiss().then(resp => {
      console.log(resp.data);
      if (resp.data) {
        this.direccion = resp.data.direccion;
        this.dirReady = true;
        this.zoom = 18;
        this.presentToast('De ser necesario, puedes mover el pin a tu ubicación exacta');
      }
    });
    return await modal.present();
  }

  async generarPedido() {
    try {
      const prods = this.productos.filter(p => p.cantidad);
      const items: ProductoPedido[] = [];
      prods.forEach(p => {
        const x: ProductoPedido = {
          cantidad: p.cantidad,
          id: p.id,
        };
        items.push(x);
      });
      const id = await this.compraService.generaID();
      const pedido: Pedido = {
        direccion: this.direccion,
        productos: items,
        id
      };
      await this.compraService.ordenar(pedido);
      this.muestraPedido(pedido);
    } catch (error) {
      console.log(error);
    }
  }

  async muestraPedido(pedido) {
    const modal = await this.modalController.create({
      enterAnimation: EnterAnimation,
      leaveAnimation: LeaveAnimation,
      component: PedidoPage,
      componentProps: {pedido}
    });
    modal.onDidDismiss().then(resp => {
      console.log(resp.data);
      this.regresar(resp.data);
    });
    return await modal.present();
  }

  guardaLoc(evento) {
    this.direccion.lat = evento.coords.lat;
    this.direccion.lng = evento.coords.lng;
  }

  regresar(resp?) {
    this.modalController.dismiss(resp.data);
  }

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}
