import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tuto-install-ios',
  templateUrl: './tuto-install-ios.page.html',
  styleUrls: ['./tuto-install-ios.page.scss'],
})
export class TutoInstallIosPage implements OnInit {

  @ViewChild (IonSlides, {static: false}) slide: IonSlides;


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

  back() {
    console.log(this.slide.isBeginning());
    if (this.slide.isBeginning()) {
      return;
    }
    this.slide.slidePrev();
  }

  salir() {
    this.modalCtrl.dismiss();
  }

}
