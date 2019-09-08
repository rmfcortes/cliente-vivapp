import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';

import { DireccionesModalPage } from './direcciones-modal.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBFJ19-ZZzdW8ftMiMJcgf4eoaBCoCEsS0',
      libraries: ['places']
    }),
  ],
  declarations: [DireccionesModalPage],
  entryComponents: [DireccionesModalPage]
})
export class DireccionesModalPageModule {}
