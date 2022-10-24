import {  NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { DasboardComponent } from '../dasboard/dasboard.component';
import { AdminComponent } from './admin.component';
const redirectToLogin = () => redirectUnauthorizedTo(['/signIn']);
const redirectToHome = () => redirectLoggedInTo(['/home']);
const routes: Routes = [
  { path: 'admin', component: AdminComponent, ...canActivate(redirectToLogin),
children:[
    {path:'dashboard',component:DasboardComponent}
] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
