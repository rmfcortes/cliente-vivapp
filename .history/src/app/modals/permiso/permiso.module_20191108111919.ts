import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PermisoPage } from './permiso.page';

const routes: Routes = [
  {
    path: '',
    component: PermisoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PermisoPage],
  entryComponents: [PermisoPage]
})
export class PermisoPageModule {}
