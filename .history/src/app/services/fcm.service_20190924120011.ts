import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UidService } from './uid.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { messaging } from 'firebase';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  uid: string;
  msgSub: Subscription;

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
          this.db.object(`usuarios/${this.uid}/token`).set(token);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  escuchaMensajes() {
    if (this.msgSub) {
      return;
    }
    this.msgSub = this.afMessaging.messages.subscribe(msg => {
      console.log(msg);
    });
  }

  unsubscribeMensajes() {
    if (this.msgSub) {
     this.msgSub.unsubscribe();
    }
  }

}
