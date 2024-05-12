import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { CategoryComponent } from './components/category/category.component';
import { AddComponent } from './components/product/add/add.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { FaqComponent } from './components/product/faq/faq.component';
import { OrderComponent } from './components/order/order.component';
import { DetailsOrderComponent } from './components/details-order/details-order.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [{ path: '', component: AdminComponent },
{path :'acceuil' ,component:AcceuilComponent},
{path:'category' ,component:CategoryComponent},
{path:'product' ,component:AddComponent},
{path:'coupon' ,component:CouponComponent},
{ path: 'faq/:idProduct', component: FaqComponent },
{path:'order' ,component:OrderComponent},
{path:'profile' ,component:ProfileComponent},
{path:'users' ,component:UsersComponent},
{ path: 'orderDetails/:idOrder', component: DetailsOrderComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
