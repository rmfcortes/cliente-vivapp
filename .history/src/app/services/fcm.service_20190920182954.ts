import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UidService } from './uid.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  uid: string;

  constructor(
    private db: AngularFireDatabase,
    private afMessaging: AngularFireMessaging,
    private uidService: UidService,
  ) {
    this.uid = this.uidService.getUid();
  }

  requestToken() {
    this.afMessaging.requestToken
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);
          this.db.object(`usuarios/token`).set(token);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
