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

  uid: string;
  msgSub: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private toastController: ToastController,
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
      this.presentToast(msg);
    });
  }

  unsubscribeMensajes() {
    if (this.msgSub) {
     this.msgSub.unsubscribe();
    }
  }

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

}
