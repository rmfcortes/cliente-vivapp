import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { AgmCoreModule } from '@agm/core';

import { DireccionesModalPageModule } from 'src/app/modals/direcciones-modal/direcciones-modal.module';
import { environment } from 'src/environments/environment';
import { QrPageModule } from 'src/app/modals/qr/qr.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrPageModule,
    DireccionesModalPageModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    }),
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
