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
  ) {  }

  requestToken() {
    return new Promise((resolve, reject) => {
      this.uid = this.uidService.getUid();
      if (this.tokSub && this.token) {
        this.escuchaMensajes();
        return resolve();
      }
      this.tokSub = this.afMessaging.requestToken
        .subscribe(
          (token) => {
            this.db.object(`usuarios/${this.uid}/token`).set(token);
            this.uidService.setToken(token);
            this.escuchaMensajes();
            resolve();
          },
          (error) => {
            console.error(error);
          }
        );
    });
  }

  escuchaMensajes() {
    if (this.msgSub) {
      return;
    }
    this.msgSub = this.afMessaging.messages.subscribe((msg: any) => {
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
