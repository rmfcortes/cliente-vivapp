import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

import { AuthService } from '../../services/auth.service';
import { IonSlides } from '@ionic/angular';
import { Pedido, Chofer } from 'src/app/interfaces/compra.interface';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild (IonSlides, {static: false}) slide: IonSlides;
  @ViewChild('txtHome', {static: false}) public searchElement: ElementRef;

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
    foto: ''
  };

  direccion: string;

  zoom = 14;
  lat = 20.622894;
  lng = -103.415830;
  latMe: number;
  lngMe: number;
  dirReady = false;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private authService: AuthService,
    private compraService: CompraService,
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.slide.lockSwipes(true);
  }

  agregar() {
    this.pedido.cantidad++;
    this.cuenta = this.pedido.precio * this.pedido.cantidad;
  }

  quitar() {
    if (this.pedido.cantidad === 0) {
      return;
    } else {
      this.pedido.cantidad--;
    }
  }

  ordenar() {
    this.slide.lockSwipes(false);
    this.slide.slideNext();
    this.slide.lockSwipes(true);
    this.enProceso = true;
    setTimeout(() => {
      this.setAutocomplete();
    }, 500);
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
              this.lat = place.geometry.location.lat();
              this.lng = place.geometry.location.lng();
              this.direccion = place.formatted_address;
              this.zoom = 18;
              this.dirReady = true;
          });
      });
    });
  }

  guardaLoc(evento) {
    this.lat = evento.coords.lat;
    this.lng = evento.coords.lng;
  }

  escucharCambios() {
    const espSub = this.compraService.esperando().subscribe((chofer: any) => {
      console.log(chofer);
      if (!chofer) {
        return;
      }
      this.chofer = chofer;
    });
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
