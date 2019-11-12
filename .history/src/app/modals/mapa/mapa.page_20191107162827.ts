import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { PedidoPage } from '../pedido/pedido.page';

import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

import { CompraService } from 'src/app/services/compra.service';

import { EnterAnimation } from 'src/app/animations/enter';
import { LeaveAnimation } from 'src/app/animations/leave';

import { Direccion, ProductoPedido, Pedido, Producto } from 'src/app/interfaces/compra.interface';
import { UidService } from 'src/app/services/uid.service';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  @Input() productos;
  @Input() qr;

  direccion: Direccion = {
    lat: 0,
    lng: 0,
    direccion: ''
  };

  zoom = 17;
  dirReady = false;

  icon = '../../../assets/img/pin.png';
  inputDir = '';

  enPedido = false;

  constructor(
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private modalController: ModalController,
    private toastController: ToastController,
    private compraService: CompraService,
    private uidService: UidService,
  ) { }

  // Inicio

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getDireccion();
  }

  async getDireccion() {
    const dir: Direccion = await this.compraService.getDireccion();
    if (dir) {
      this.direccion = dir;
      this.dirReady = true;
      this.zoom = 17;
    } else {
      setTimeout(() => {
        this.setAutocomplete();
      }, 500);
    }
  }

  // Acciones

  async generarPedido() {
    if (this.qr) {
      this.modalController.dismiss(true);
      return;
    }
    try {
      this.enPedido = true;
      const prods = this.productos.filter(p => p.cantidad);
      const items: ProductoPedido[] = [];
      prods.forEach((p: Producto) => {
        const x: ProductoPedido = {
          cantidad: p.cantidad,
          id: p.id,
          nombre: p.nombre
        };
        items.push(x);
      });
      this.compraService.test('antes de generar id');
      const id = await this.compraService.generaID();
      this.compraService.test('después de generar id');
      const pedido: Pedido = {
        direccion: this.direccion,
        productos: items,
        id,
        createdAt: Date.now(),
        token: this.uidService.getToken() || '',
        usuario: this.uidService.getUser().nombre
      };
      this.compraService.test('antes de generar orden');
      this.compraService.test(pedido);
      await this.compraService.ordenar(pedido);
      this.muestraPedido(pedido);
      this.enPedido = false;
    } catch (error) {
      this.compraService.errores(error);
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
    modal.onDidDismiss().then(() => {
      setTimeout(() => {
        this.regresar();
      }, 100);
    });
    return await modal.present();
  }

  cambiarDir() {
    this.dirReady = false;
    setTimeout(() => {
      this.setAutocomplete();
    }, 500);
  }

  // Auxiliares

  regresar() {
    this.modalController.dismiss();
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
    this.compraService.guardarDireccion(this.direccion);
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
              this.presentToast('De ser necesario, puedes mover el pin a tu ubicación exacta');
          });
      });
    });
  }

}
