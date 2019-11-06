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
    this.swService.checkUpdates();
    this.platform.ready().then(() => {
    });
  }
}
