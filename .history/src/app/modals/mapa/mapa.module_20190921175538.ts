import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaPage } from './mapa.page';

import { AgmCoreModule } from '@agm/core';

import { environment } from 'src/environments/environment';
import { PedidoPageModule } from '../pedido/pedido.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPageModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey,
      libraries: ['places']
    }),
  ],
  declarations: [MapaPage],
  entryComponents: [MapaPage]
})
export class MapaPageModule {}
