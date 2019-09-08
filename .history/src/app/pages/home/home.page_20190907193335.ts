import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UidService } from '../../services/uid.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cantidad = 0;
  cuenta = 0;
  precio = 15;

  constructor(
    private router: Router,
    private uidService: UidService,
    private authService: AuthService,
  ) { }

  ngOnInit() { }

  async salir() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

  agregar() {
    this.cantidad++;
    this.cuenta = this.precio * this.cantidad;
  }

  quitar() {
    if (this.cantidad === 0) {
      return;
    } else {
      this.cantidad--;
    }
  }

  ordenar() {
    console.log('Ordenar');
  }

}
