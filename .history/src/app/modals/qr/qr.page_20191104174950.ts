import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UidService } from 'src/app/services/uid.service';
import { CompraService } from 'src/app/services/compra.service';
import { Direccion } from 'src/app/interfaces/compra.interface';
import { qrEnterAnimation } from 'src/app/animations/qrEnter';
import { qrLeaveAnimation } from 'src/app/animations/qrLeave';
import { MapaPage } from '../mapa/mapa.page';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  dirReady = true;

  uid: string;
  nombre: string;
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
      this.dirReady = true;
    } else {
      this.dirReady = false;
    }
  }

  async presentMapa() {
    const modal = await this.modalCtr.create({
      enterAnimation: qrEnterAnimation,
      leaveAnimation: qrLeaveAnimation,
      component: MapaPage,
      componentProps: {qr : true}
    });
    modal.onDidDismiss().then(resp => {
      if (resp.data) {
        this.dirReady = true;
      } else {
        this.dirReady = false;
      }
    });
    return await modal.present();
  }

  ionViewWillEnter() {
    this.uid = this.uidService.getUid();
    this.nombre = this.uidService.getUser().nombre;
  }

  regresar() {
    this.modalCtr.dismiss();
  }

}
