import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule, MenuController } from '@ionic/angular';

import { MenuComponent } from './menu.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [],
  entryComponents: [MenuController]
})
export class MenuComponentModule {}
