import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UidService } from 'src/app/services/uid.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  uid: string;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';

  constructor(
    private modalCtr: ModalController,
    private uidService: UidService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.uid = this.uidService.getUid();
  }

  regresar() {
    this.modalCtr.dismiss();
  }

}
