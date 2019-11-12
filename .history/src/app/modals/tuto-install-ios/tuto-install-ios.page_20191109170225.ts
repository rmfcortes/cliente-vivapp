import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tuto-install-ios',
  templateUrl: './tuto-install-ios.page.html',
  styleUrls: ['./tuto-install-ios.page.scss'],
})
export class TutoInstallIosPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false,
    loop: false,
    centeredSlides: true,
    speed: 800
  };

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  salir() {
    this.modalCtrl.dismiss();
  }

}
