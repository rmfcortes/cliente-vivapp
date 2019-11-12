import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { IonicRatingModule } from 'ionic4-rating';

import { QrPageModule } from 'src/app/modals/qr/qr.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MapaPageModule } from 'src/app/modals/mapa/mapa.module';
import { PedidoPageModule } from 'src/app/modals/pedido/pedido.module';
import { MenuComponentModule } from 'src/app/components/menu/menu.component.module';
import { LoginPageModule } from 'src/app/modals/login/login.module';
import { TutoInstallIosPageModule } from 'src/app/modals/tuto-install-ios/tuto-install-ios.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    QrPageModule,
    MapaPageModule,
    LoginPageModule,
    PedidoPageModule,
    MenuComponentModule,
    TutoInstallIosPageModule,
    IonicRatingModule,
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
