import { Component } from '@angular/core';
import { CustomerService } from '../../../customer/service/customer.service';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrderComponent {




  ordersPending: any = [];
  ordersShipped: any = [];
  ordersDelivred: any = [];
  ordersPlaced: any = [];

  idUser = UserStorageService.getUserId();

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {

   
    this.getAllOrders()
  }



  getAllOrders() {

    this.customerService.getOrderPending(this.idUser).subscribe(
      (res) =>{

        
        this.ordersPending = res
      }
    )

    this.customerService.getOrderShipped(this.idUser).subscribe(
      (res) => {

        this.ordersShipped = res
      }
    )

    this.customerService.getOrderDelivered(this.idUser).subscribe(
      (res) => {

        this.ordersDelivred= res
      }
    )

    this.customerService.getOrderPlaced(this.idUser).subscribe(
      (res) => {

        this.ordersPlaced = res
      }
    )




  }








    



  

}
