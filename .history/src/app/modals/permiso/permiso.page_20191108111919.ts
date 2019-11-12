import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.page.html',
  styleUrls: ['./permiso.page.scss'],
})
export class PermisoPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  salir() {
    this.modalCtrl.dismiss();
  }

}
