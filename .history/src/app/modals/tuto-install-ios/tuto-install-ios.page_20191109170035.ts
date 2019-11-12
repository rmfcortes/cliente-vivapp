import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tuto-install-ios',
  templateUrl: './tuto-install-ios.page.html',
  styleUrls: ['./tuto-install-ios.page.scss'],
})
export class TutoInstallIosPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  salir() {
    this.modalCtrl.dismiss();
  }

}
