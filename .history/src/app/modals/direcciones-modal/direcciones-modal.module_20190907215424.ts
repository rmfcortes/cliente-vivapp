import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DireccionesModalPage } from './direcciones-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionesModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DireccionesModalPage]
})
export class DireccionesModalPageModule {}
