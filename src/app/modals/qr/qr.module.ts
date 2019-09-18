import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPage } from './qr.page';

import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
  ],
  declarations: [QrPage],
  entryComponents: [QrPage]
})
export class QrPageModule {}
