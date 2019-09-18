import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { IonSlides, ModalController, ToastController } from '@ionic/angular';
import { Pedido, Chofer, Direccion, PedidoActivo } from 'src/app/interfaces/compra.interface';
import { CompraService } from 'src/app/services/compra.service';
import { DireccionesModalPage } from 'src/app/modals/direcciones-modal/direcciones-modal.page';
import { RutasService } from 'src/app/services/rutas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild (IonSlides, {static: false}) slide: IonSlides;

  pedido: Pedido = {
    cantidad: 0,
    precio: 15,
  };

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

  direccion: Direccion = {
    lat: 20.622894,
    lng: -103.415830,
    direccion: ''
  };

  zoom = 14;
  dirReady = false;

  pedidoActivo = false;
  repartidorReady = false;

  pedidoEnCurso: PedidoActivo;

  icon = '../../../assets/img/pin.png';
  truck = '../../../assets/img/truck.png';

  constructor(
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private compraService: CompraService,
    private rutaService: RutasService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
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
      this.pedidoEnCurso = pedido;
      const chofer = JSON.parse(localStorage.getItem('chofer'));
      if (chofer) {
        this.chofer = chofer;
        console.log(chofer);
        this.repartidorReady = true;
      } else {
        this.escucharCambios();
      }
      this.dirReady = true;
    } else {
      this.slide.lockSwipes(true);
    }
  }

  // Página principal

  agregar() {
    this.pedido.cantidad++;
    this.cuenta = this.pedido.precio * this.pedido.cantidad;
  }

  quitar() {
    if (this.pedido.cantidad === 0) {
      this.cuenta = 0;
      return;
    } else {
      this.pedido.cantidad--;
      this.cuenta = this.pedido.precio * this.pedido.cantidad;
    }
  }

  async verMapa() {
    this.slide.lockSwipes(false);
    this.slide.slideNext();
    this.slide.lockSwipes(true);
    this.enProceso = true;
    const dir: Direccion = await this.compraService.getUltimaDireccion();
    if (dir) {
      this.direccion = dir;
      this.dirReady = true;
      this.zoom = 18;
    }
  }

  // Página mapa

  async muestraDirecciones() {
    const modal = await this.modalController.create({
      component: DireccionesModalPage,
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
      this.pedidoEnCurso = await this.compraService.ordenar(this.pedido, this.direccion);
      this.slide.lockSwipes(false);
      this.slide.slideNext();
      this.slide.lockSwipes(true);
      this.pedidoActivo = true;
      this.enProceso = false;
      this.escucharCambios();
    } catch (error) {
      console.log(error);
    }
  }

  guardaLoc(evento) {
    this.direccion.lat = evento.coords.lat;
    this.direccion.lng = evento.coords.lng;
  }

  // Página pedido activo

  escucharCambios() {
    console.log(this.pedidoEnCurso);
    if (!this.pedidoEnCurso) { return; }
    const espSub = this.compraService.esperando(this.pedidoEnCurso.id).subscribe((chofer: any) => {
      console.log(chofer);
      if (!chofer) {
        return;
      }
      this.chofer = chofer;
      if (!this.chofer.foto) {
        this.chofer.foto = '../../../assets/img/chofer.png';
      }
      localStorage.setItem('chofer', JSON.stringify(chofer));
      this.repartidorReady = true;
      espSub.unsubscribe();
    });
  }

  // async navegar() {
  //   try {
  //     const puntos: any = await this.rutaService.getRuta(ubicacion.coords.latitude, ubicacion.coords.longitude, this.lat, this.lng);
  //     this.puntos = puntos;
  //     this.rutaReady = true;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
