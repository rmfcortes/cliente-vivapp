import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutoInstallIosPage } from './tuto-install-ios.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [TutoInstallIosPage],
  entryComponents: [TutoInstallIosPage]
})
export class TutoInstallIosPageModule {}
