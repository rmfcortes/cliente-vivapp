import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { AgmCoreModule } from '@agm/core';

import { DireccionesModalPageModule } from 'src/app/modals/direcciones-modal/direcciones-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionesModalPageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBFJ19-ZZzdW8ftMiMJcgf4eoaBCoCEsS0'
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
