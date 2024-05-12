import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './guest/components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarGuestComponent } from './navbars/navbar-guest/navbar-guest.component';
import { NavbarAdminComponent } from './navbars/navbar-admin/navbar-admin.component';
import { NavbarCustomerComponent } from './navbars/navbar-customer/navbar-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './guest/components/signup/signup.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarGuestComponent,
    NavbarAdminComponent,
    NavbarCustomerComponent,
    SignupComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
