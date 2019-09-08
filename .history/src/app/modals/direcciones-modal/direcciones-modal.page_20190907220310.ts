import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-direcciones-modal',
  templateUrl: './direcciones-modal.page.html',
  styleUrls: ['./direcciones-modal.page.scss'],
})
export class DireccionesModalPage implements OnInit {

  @ViewChild('txtHome', {static: false}) public searchElement: ElementRef;

  direccion: string;

  zoom = 14;
  lat = 20.622894;
  lng = -103.415830;
  latMe: number;
  lngMe: number;
  dirReady = false;

  constructor(
    private modalCtrl: ModalController,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.setAutocomplete();
    }, 800);
  }

  setAutocomplete() {
    this.mapsAPILoader.load().then(async () => {
      const nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      const autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
              // get the place result
              const place: google.maps.places.PlaceResult = autocomplete.getPlace();

              // verify result
              if (place.geometry === undefined || place.geometry === null) {
                  return;
              }
              // set latitude, longitude and zoom
              this.lat = place.geometry.location.lat();
              this.lng = place.geometry.location.lng();
              this.direccion = place.formatted_address;
              this.zoom = 18;
              this.dirReady = true;
          });
      });
    });
  }

  guardarDireccion() {
    const dir = {
      lat: this.lat,
      lng: this.lng,
      direccion: this.direccion
    };
    this.modalCtrl.dismiss({direccion: dir});
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}
