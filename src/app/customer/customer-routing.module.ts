import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { HomeComponent } from './components/home/home.component';
import { FaqComponent } from './components/faq/faq.component';
import { CartComponent } from './components/cart/cart.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderComponent } from './components/orders/orders.component';
import { DetailsOrderComponent } from './components/order-details/order-details.component';


const routes: Routes = [{ path: '', component: CustomerComponent },
{path :'home' ,component:HomeComponent},
{ path: 'faq/:idProduct', component: FaqComponent },
{ path: 'cart', component: CartComponent },
{ path: 'app-wish-list', component: WishListComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'orders', component: OrderComponent },
{ path: 'orderDetails/:idOrder', component: DetailsOrderComponent },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
