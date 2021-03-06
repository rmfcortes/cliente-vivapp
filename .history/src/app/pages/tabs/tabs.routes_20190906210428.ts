import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:
      [
        {
          path: 'home-tab',
          children:
            [
              {
                path: '',
                loadChildren: '../home/home.module#HomePageModule',
                canActivate: [ AuthGuard ]
              }
            ]
        },
        {
          path: 'pedidos-tab',
          children:
            [
              {
                path: '',
                loadChildren: '../favoritos/favoritos.module#FavoritosPageModule',
                canActivate: [ AuthGuard ]
              }
            ]
        },
        {
          path: 'perfil-tab',
          children:
            [
              {
                path: '',
                loadChildren: '../perfil/perfil.module#PerfilPageModule',
                canActivate: [ AuthGuard ]
              }
            ]
        },
        {
          path: '',
          redirectTo: 'tabs/home-tab',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: 'tabs/home-tab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class TabsPageRoutingModule {}
