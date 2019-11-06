import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class SwUpdateService {

  constructor(private updates: SwUpdate) { }

  checkUpdates() {
    console.log('Check updates 3.0');
    setTimeout(() => {
      this.updates.checkForUpdate().then(resp => {
        console.log(resp);
      });
      this.updates.available.subscribe(event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
      });
      this.updates.activated.subscribe(event => {
        console.log('old version was', event.previous);
        console.log('new version is', event.current);
      });
    }, 15000);
  }

}
