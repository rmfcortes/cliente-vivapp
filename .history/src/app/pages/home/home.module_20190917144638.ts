import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { DireccionesModalPageModule } from 'src/app/modals/direcciones-modal/direcciones-modal.module';
import { QrPageModule } from 'src/app/modals/qr/qr.module';
import { MapaPageModule } from 'src/app/modals/mapa/mapa.module';
import { PedidoPageModule } from 'src/app/modals/pedido/pedido.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrPageModule,
    MapaPageModule,
    PedidoPageModule,
    DireccionesModalPageModule,
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
