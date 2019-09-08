import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UidService } from '../../services/uid.service';
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

  constructor(
    private router: Router,
    private authService: AuthService,
    private compraService: CompraService,
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
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
    this.enProceso = true;
    this.slide.lockSwipes(true);
    this.compraService.ordenar(this.pedido);
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

}
