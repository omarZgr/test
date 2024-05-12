import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { FaqComponent } from './components/faq/faq.component';
import { CartComponent } from './components/cart/cart.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderComponent } from './components/orders/orders.component';
import { DetailsOrderComponent } from './components/order-details/order-details.component';



@NgModule({
  declarations: [
    CustomerComponent,
    HomeComponent,
    FaqComponent,
    CartComponent,
    WishListComponent,
    ProfileComponent,
  OrderComponent,DetailsOrderComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    AdminRoutingModule,ReactiveFormsModule

  ]
})
export class CustomerModule { }
