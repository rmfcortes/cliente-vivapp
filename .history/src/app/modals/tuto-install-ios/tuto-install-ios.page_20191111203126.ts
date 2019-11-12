import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tuto-install-ios',
  templateUrl: './tuto-install-ios.page.html',
  styleUrls: ['./tuto-install-ios.page.scss'],
})
export class TutoInstallIosPage implements OnInit {

  @ViewChild (IonSlides, {static: false}) slide: IonSlides;


  first = true;
  last = false;

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

  async back() {
    let isFirst = await this.slide.isBeginning();
    console.log(isFirst);
    if (isFirst) {
      this.first = true;
      return;
    }
    this.slide.slidePrev();
    isFirst = await this.slide.isBeginning();
    console.log(isFirst);
    if (isFirst) {
      this.first = true;
      return;
    }
  }

  async next() {
    this.first = false;
    const isLast = await this.slide.isEnd();
    console.log(isLast);
    if (isLast) {
      this.last = true;
      return;
    }
    this.slide.slideNext();
  }

  salir() {
    this.modalCtrl.dismiss();
  }

}
