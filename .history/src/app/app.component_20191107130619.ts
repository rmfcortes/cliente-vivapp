import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SwUpdateService } from './services/sw-update.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private swService: SwUpdateService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', (event) => {
          event.preventDefault();
          event.stopPropagation();
        }, false);
      });
      this.swService.checkUpdates();
    });
  }
}
