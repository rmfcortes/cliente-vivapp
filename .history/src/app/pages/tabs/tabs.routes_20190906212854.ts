import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  {
    path: 'agua',
    component: TabsPage,
    children:
      [
        {
          path: 'agua/home-tab',
          children:
            [
              {
                path: '',
                loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
              }
            ]
        },
        {
          path: 'agua/pedidos-tab',
          children:
            [
              {
                path: '',
                loadChildren: '../pedidos/pedidos.module#PedidosPageModule',
              }
            ]
        },
        {
          path: 'agua/perfil-tab',
          children:
            [
              {
                path: '',
                loadChildren: '../perfil/perfil.module#PerfilPageModule',
              }
            ]
        },
      ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class TabsPageRoutingModule {}
