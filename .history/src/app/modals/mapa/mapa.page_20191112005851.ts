import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';

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

  centro = {
    lat: 20.6232687,
    lng: -103.4154983,
  };

  cobertura = 4;

  zoom = 17;
  dirReady = false;

  icon = '../../../assets/img/pin.png';
  inputDir = '';

  enPedido = false;

  lejos = false;

  constructor(
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private alertController: AlertController,
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
      const id = await this.compraService.generaID();
      const pedido: Pedido = {
        direccion: this.direccion,
        productos: items,
        id,
        createdAt: Date.now(),
        usuario: this.uidService.getNombre() || 'Anónimo'
      };
      await this.compraService.ordenar(pedido);
      this.muestraPedido(pedido);
      this.enPedido = false;
      localStorage.setItem('pedidos', '1');
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

  async guardaLoc(evento) {
    const d = await this.calculaDistancia(
      this.centro.lat,
      this.centro.lng,
      evento.coords.lat,
      evento.coords.lng
    );
    if (d <= this.cobertura) {
      this.lejos = false;
      this.direccion.lat = evento.coords.lat;
      this.direccion.lng = evento.coords.lng;
      this.compraService.guardarDireccion(this.direccion);
    } else {
      this.lejos = true;
      this.presentAlert('Fuera de cobertura',
        'Lo sentimos. Por el momento Azul Pura no tiene cobertura de reparto en tu zona.');
    }
  }

  setAutocomplete() {
    this.mapsAPILoader.load().then(async () => {
      const nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      const autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
          this.ngZone.run(async () => {
              // get the place result
              const place: google.maps.places.PlaceResult = autocomplete.getPlace();

              // verify result
              if (place.geometry === undefined || place.geometry === null) {
                  return;
              }
              // set latitude, longitude and zoom
              const d = await this.calculaDistancia(
                this.centro.lat,
                this.centro.lng,
                place.geometry.location.lat(),
                place.geometry.location.lng()
              );
              if (d <= this.cobertura) {
                this.direccion.lat = place.geometry.location.lat();
                this.direccion.lng = place.geometry.location.lng();
                this.direccion.direccion = place.formatted_address;
                this.compraService.guardarDireccion(this.direccion);
                this.dirReady = true;
                this.inputDir = '';
                this.presentToast('De ser necesario, puedes mover el pin a tu ubicación exacta');
              } else {
                this.presentAlert('Fuera de cobertura',
                  'Lo sentimos. Por el momento Azul Pura no tiene cobertura de reparto en tu zona.');
              }
          });
      });
    });
  }

  async presentAlert(title, msg) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  calculaDistancia( lat1, lng1, lat2, lng2 ): Promise<number> {
    return new Promise ((resolve, reject) => {
      const R = 6371; // Radius of the earth in km
      const dLat = this.deg2rad(lat2 - lat1);  // this.deg2rad below
      const dLon = this.deg2rad(lng2 - lng1);
      const a =
         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
         Math.sin(dLon / 2) * Math.sin(dLon / 2)
         ;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in kms
      resolve(d);
    });
  }

  deg2rad( deg ) {
    return deg * (Math.PI / 180);
  }

}
