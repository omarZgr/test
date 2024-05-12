import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { CategoryComponent } from './components/category/category.component';
import { AddComponent } from './components/product/add/add.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { FaqComponent } from './components/product/faq/faq.component';
import { OrderComponent } from './components/order/order.component';
import { DetailsOrderComponent } from './components/details-order/details-order.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  declarations: [
    AdminComponent,
    AcceuilComponent,
    CategoryComponent,
    AddComponent,
    CouponComponent,
    FaqComponent,
    OrderComponent,
    DetailsOrderComponent,
    ProfileComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,ReactiveFormsModule
  ]
})
export class AdminModule { }
