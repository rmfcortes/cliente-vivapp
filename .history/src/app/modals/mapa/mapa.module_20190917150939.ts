import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaPage } from './mapa.page';

import { AgmCoreModule } from '@agm/core';
import { DireccionesModalPageModule } from '../direcciones-modal/direcciones-modal.module';

import { environment } from 'src/environments/environment';
import { PedidoPageModule } from '../pedido/pedido.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPageModule,
    DireccionesModalPageModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    }),
  ],
  declarations: [MapaPage],
  entryComponents: [MapaPage]
})
export class MapaPageModule {}
