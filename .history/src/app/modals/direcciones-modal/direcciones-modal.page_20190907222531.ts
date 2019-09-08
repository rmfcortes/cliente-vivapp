import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { Direccion } from 'src/app/interfaces/compra.interface';

@Component({
  selector: 'app-direcciones-modal',
  templateUrl: './direcciones-modal.page.html',
  styleUrls: ['./direcciones-modal.page.scss'],
})
export class DireccionesModalPage implements OnInit {

  @ViewChild('txtHome', {static: false}) public searchElement: ElementRef;

  direcciones: Direccion[] = [];

  direccion: Direccion = {
    direccion: '',
    lat: 0,
    lng: 0
  }

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private modalCtrl: ModalController,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.setAutocomplete();
    }, 1000);
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
              this.direccion.lat = place.geometry.location.lat();
              this.direccion.lng = place.geometry.location.lng();
              this.direccion.direccion = place.formatted_address;
              this.direcciones.push(this.direccion);
          });
      });
    });
  }

  guardarDireccion(dir) {
    this.modalCtrl.dismiss({direccion: dir});
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}
