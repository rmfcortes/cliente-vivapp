import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MenuComponent } from './menu.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [MenuComponent],
  entryComponents: [MenuComponent]
})
export class MenuComponentModule {}
