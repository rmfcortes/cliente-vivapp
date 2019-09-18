import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, ToastController } from '@ionic/angular';

import { DireccionesModalPage } from 'src/app/modals/direcciones-modal/direcciones-modal.page';
import { QrPage } from 'src/app/modals/qr/qr.page';

import { AuthService } from '../../services/auth.service';
import { CompraService } from 'src/app/services/compra.service';

import { Chofer, Direccion, Pedido, Producto, ProductoPedido } from 'src/app/interfaces/compra.interface';
import { qrEnterAnimation } from '../../animations/enter';
import { qrLeaveAnimation } from '../../animations/leave';
import { MapaPage } from 'src/app/modals/mapa/mapa.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild (IonSlides, {static: false}) slide: IonSlides;

  pedido: Pedido;
  productos: Producto[];

  cuenta = 0;

  enProceso = false;

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false,
    loop: false,
    centeredSlides: true,
    speed: 800
  };

  chofer: Chofer = {
    nombre: '',
    telefono: '',
    foto: '../../../assets/img/chofer.png',
    lat: 0,
    lng: 0
  };

  pedidoActivo = false;

  icon = '../../../assets/img/pin.png';
  truck = '../../../assets/img/truck.png';

  choferReady = false;

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
    console.log(this.productos);
  }

  ionViewWillEnter() {
    const pedido = JSON.parse(localStorage.getItem('pedido'));
    console.log(pedido);
    if (pedido) {
      this.pedidoActivo = true;
      this.slide.slideTo(2);
      this.slide.lockSwipes(true);
      this.direccion = {
        lat: pedido.direccion.lat,
        lng: pedido.direccion.lng,
        direccion: pedido.direccion.direccion
      };
      this.pedido = pedido;
      const chofer = JSON.parse(localStorage.getItem('chofer'));
      if (chofer) {
        this.chofer = chofer;
        this.choferReady = true;
        this.getStatus();
        console.log(chofer);
      } else {
        this.escucharCambios();
      }
    }
  }

  // Página principal

  agregar(i) {
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
      enterAnimation: qrEnterAnimation,
      leaveAnimation: qrLeaveAnimation,
      component: MapaPage,
    });
    return await modal.present();
  }

  // Página mapa


  guardaLoc(evento) {
    this.direccion.lat = evento.coords.lat;
    this.direccion.lng = evento.coords.lng;
  }

  // Página pedido activo

  escucharCambios() {
    console.log(this.pedido);
    if (!this.pedido) { return; }
    const espSub = this.compraService.esperando(this.pedido.id).subscribe((chofer: any) => {
      console.log(chofer);
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

  getStatus() {
    const stSub = this.compraService.getStatusPedido(this.pedido.id).subscribe(async (status: any) => {
      console.log(status);
      if (status.pedido !== 'entregado') {
        return;
      }
      await this.compraService.deletePedido(this.pedido.id);
      this.productos.forEach(p => {
        p.cantidad = 0;
      });
      this.slide.lockSwipes(false);
      this.slide.slideTo(0);
      this.slide.lockSwipes(true);
      this.presentToast('Pedido entregado. ¡¡Gracias por su preferencia!!');
      this.pedido = null;
      localStorage.removeItem('pedido');
      localStorage.removeItem('chofer');
      this.choferReady = false;
      this.dirReady = false;
      this.pedidoActivo = false;
      stSub.unsubscribe();
    });
  }

  // Auxiliares

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  regresar() {
    this.slide.lockSwipes(false);
    this.slide.slidePrev();
    this.enProceso = false;
    this.slide.lockSwipes(true);
  }

  async salir() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

}
