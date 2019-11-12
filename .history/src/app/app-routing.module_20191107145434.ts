import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
        // canActivate: [AuthGuard]
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
      },
      {
        path: 'politica',
        loadChildren: './pages/politica/politica.module#PoliticaPageModule'
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
