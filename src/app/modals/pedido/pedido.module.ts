import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PedidoPage } from './pedido.page';

import { AgmCoreModule } from '@agm/core';

import { environment } from 'src/environments/environment';
import { ChatPageModule } from '../chat/chat.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    }),
  ],
  declarations: [PedidoPage],
  entryComponents: [PedidoPage]
})
export class PedidoPageModule {}
