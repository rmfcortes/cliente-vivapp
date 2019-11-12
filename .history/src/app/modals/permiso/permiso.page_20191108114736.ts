import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FcmService } from 'src/app/services/fcm.service';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.page.html',
  styleUrls: ['./permiso.page.scss'],
})
export class PermisoPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private fcmService: FcmService,
  ) { }

  ngOnInit() {
    console.log('ionit');
  }

  async activaPermisos()  {
    await this.fcmService.requestToken();
    this.modalCtrl.dismiss();
  }

  salir() {
    console.log('salir');
    this.modalCtrl.dismiss();
  }

}
