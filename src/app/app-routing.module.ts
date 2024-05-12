import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './guest/components/login/login.component';
import { SignupComponent } from './guest/components/signup/signup.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { GuardCustomerGuard } from './guardes/customer.guard';
import { GuardAdminGuard } from './guardes/admin.guard';

const routes: Routes = [
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),canActivate:[GuardCustomerGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) ,canActivate:[GuardAdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: NotFoundPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
