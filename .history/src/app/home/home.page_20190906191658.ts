import { Component, OnInit } from '@angular/core';
import { UidService } from '../services/uid.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuario: string;

  constructor(
    private uidService: UidService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.usuario = this.uidService.getUser().nombre;
  }

  salir() {
    this.authService.logout();
  }

}
