import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'usuario/login'
  },
  {
    path: 'usuario',
    loadChildren: () =>  import('./pages/user/user.module').then((m) => m.UserModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
