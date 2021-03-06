import { Injectable } from '@angular/core';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  API_KEY: string;
  API_URL: string;

  constructor(public http: HttpClient) {
    this.API_KEY = environment.mapsApiKey;
    this.API_URL = `https://maps.googleapis.com/maps/api/directions/json?key=${this.API_KEY}&`;
  }

  // origin=Disneyland&destination=Universal+Studios+Hollywood&key=
  getRuta(lat, lng, lat2, lng2) {
    console.log('Get ruta');
    return new Promise ((resolve, reject) => {
      const url = `${this.API_URL}origin=${lat},${lng}&destination=${lat2},${lng2}`;
      this.http.get(url).subscribe((data: any) => {
        console.log(data);
        const decodedPoints = GoogleMaps.getPlugin().geometry.encoding.decodePath(
          // not sure if this is the exact path to the overview_polyline attribute...
          JSON.parse(data.data).routes[0].overview_polyline.points
        );
        resolve(decodedPoints);
      });
    });
  }
}
