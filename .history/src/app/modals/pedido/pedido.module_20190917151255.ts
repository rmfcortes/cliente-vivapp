import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PedidoPage } from './pedido.page';

import { AgmCoreModule } from '@agm/core';

import { environment } from 'src/environments/environment';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    }),
  ],
  declarations: [PedidoPage],
  entryComponents: [PedidoPage]
})
export class PedidoPageModule {}
