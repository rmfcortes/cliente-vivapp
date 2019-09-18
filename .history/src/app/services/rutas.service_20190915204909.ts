import { Injectable } from '@angular/core';
import { } from 'googlemaps';
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

  getRuta(lat, lng, lat2, lng2) {
    return new Promise ((resolve, reject) => {
      const url = `${this.API_URL}origin=${lat},${lng}&destination=${lat2},${lng2}`;
      this.http.get(url).subscribe((data: any) => {
        console.log(data);
        const decodedPoints = google.maps.geometry.encoding.decodePath(JSON.parse(data.data).routes[0].overview_polyline.points);
        resolve(decodedPoints);
      });
    });
  }
}
