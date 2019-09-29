import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UidService } from 'src/app/services/uid.service';
import { CompraService } from 'src/app/services/compra.service';
import { Direccion } from 'src/app/interfaces/compra.interface';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  direccion: Direccion = {
    lat: 0,
    lng: 0,
    direccion: ''
  };

  uid: string;
  elementType: 'canvas';

  constructor(
    private modalCtr: ModalController,
    private compraService: CompraService,
    private uidService: UidService,
  ) { }

  ngOnInit() {
    this.getDireccion();
  }

  async getDireccion() {
    const dir: Direccion = await this.compraService.getDireccion();
    if (dir) {
      this.direccion = dir;
      this.dirReady = true;
      this.zoom = 15;
    } else {
      setTimeout(() => {
        this.setAutocomplete();
      }, 500);
    }
  }

  ionViewWillEnter() {
    this.uid = this.uidService.getUid();
  }

  regresar() {
    this.modalCtr.dismiss();
  }

}
