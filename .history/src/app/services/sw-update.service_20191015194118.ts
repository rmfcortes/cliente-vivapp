import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SwUpdateService {

  constructor(
    private swUpdate: SwUpdate,
    private alertController: AlertController,
  ) { }

  checkUpdates() {
    console.log('Check updates 4.0');
    if (this.swUpdate.isEnabled) {
      console.log('SW activo');
      this.swUpdate.available.subscribe(async () => {
        const alert = await this.alertController.create({
          header: `App update!`,
          message: 'Newer version of the app is available. Its a quick refresh away!',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
            }, {
              text: 'Refresh',
              handler: () => {
                window.location.reload();
              },
            },
          ],
        });
        await alert.present();
      });
    }
  }

}
