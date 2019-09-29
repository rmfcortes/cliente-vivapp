import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UidService } from './uid.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { messaging } from 'firebase';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  token: string;
  uid: string;
  msgSub: Subscription;
  tokSub: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private toastController: ToastController,
    private afMessaging: AngularFireMessaging,
    private uidService: UidService,
  ) {
    this.uid = this.uidService.getUid();
  }

  requestToken() {
    return new Promise((resolve, reject) => {
      if (this.tokSub && this.token) {
        resolve();
      }
      this.tokSub = this.afMessaging.requestToken
        .subscribe(
          (token) => {
            this.db.object(`usuarios/${this.uid}/token`).set(token);
            this.setToken(token);
            resolve();
          },
          (error) => {
            console.error(error);
          }
        );
    });
  }

  setToken(token) {
    this.token = token;
    console.log('Token' + token);
  }

  getToken() {
    return this.token;
  }

  escuchaMensajes() {
    if (this.msgSub) {
      return;
    }
    this.msgSub = this.afMessaging.messages.subscribe((msg: any) => {
      console.log(msg);
      this.presentToast(msg.notification.body);
    });
  }

  unsubscribeMensajes() {
    if (this.msgSub) { this.msgSub.unsubscribe(); }
    if (this.tokSub) { this.tokSub.unsubscribe(); }
  }

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

}
