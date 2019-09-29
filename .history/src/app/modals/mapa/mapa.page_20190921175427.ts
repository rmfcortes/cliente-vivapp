import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { DireccionesModalPage } from '../direcciones-modal/direcciones-modal.page';
import { PedidoPage } from '../pedido/pedido.page';

import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

import { FcmService } from 'src/app/services/fcm.service';
import { CompraService } from 'src/app/services/compra.service';

import { EnterAnimation } from 'src/app/animations/enter';
import { LeaveAnimation } from 'src/app/animations/leave';
import { qrEnterAnimation } from 'src/app/animations/qrEnter';
import { qrLeaveAnimation } from 'src/app/animations/qrLeave';


import { Direccion, ProductoPedido, Pedido } from 'src/app/interfaces/compra.interface';
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
  inputDir = '';

  constructor(
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private modalController: ModalController,
    private toastController: ToastController,
    private compraService: CompraService,
    private fcmService: FcmService
  ) { }

  // Inicio

  ngOnInit() {
    this.getDireccion();
  }

  async getDireccion() {
    const dir: Direccion = await this.compraService.getUltimaDireccion();
    if (dir) {
      this.direccion = dir;
      this.dirReady = true;
      this.zoom = 15;
    } else {
      setTimeout(() => {
        this.setAutocomplete();
      }, 500);
    }
  }

  // Acciones

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
        id,
        createdAt: Date.now()
      };
      await this.compraService.ordenar(pedido);
      this.muestraPedido(pedido);
    } catch (error) {
      console.log(error);
    }
  }

  async muestraPedido(pedido) {
    this.fcmService.requestToken();
    const modal = await this.modalController.create({
      enterAnimation: EnterAnimation,
      leaveAnimation: LeaveAnimation,
      component: PedidoPage,
      componentProps: {pedido}
    });
    modal.onDidDismiss().then(resp => {
      console.log(resp.data);
      if (resp.data) {
        setTimeout(() => {
          this.regresar(resp.data);
        }, 100);
      }
    });
    return await modal.present();
  }

  // Auxiliares

  regresar(resp?) {
    this.modalController.dismiss(resp);
  }

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

  guardaLoc(evento) {
    this.direccion.lat = evento.coords.lat;
    this.direccion.lng = evento.coords.lng;
  }

  setAutocomplete() {
    this.mapsAPILoader.load().then(async () => {
      const nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      const autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
              // get the place result
              const place: google.maps.places.PlaceResult = autocomplete.getPlace();

              // verify result
              if (place.geometry === undefined || place.geometry === null) {
                  return;
              }
              // set latitude, longitude and zoom
              this.direccion.lat = place.geometry.location.lat();
              this.direccion.lng = place.geometry.location.lng();
              this.direccion.direccion = place.formatted_address;
              this.compraService.guardarDireccion(this.direccion);
              this.dirReady = true;
              this.inputDir = '';
              this.zoom = 16;
              this.presentToast('De ser necesario, puedes mover el pin a tu ubicación exacta');
          });
      });
    });
  }

}
