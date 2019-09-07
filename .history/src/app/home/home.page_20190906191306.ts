import { Component, OnInit } from '@angular/core';
import { UidService } from '../services/uid.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuario: string;

  constructor(
    private uidService: UidService,
  ) { }

  ngOnInit() {
    this.usuario = this.uidService.getUser().nombre;
    console.log(usuario);
  }

}
