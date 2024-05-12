import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../../admin/service/admin.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
    
    ordersPending: any = [];
    ordersShipped: any = [];
    ordersDelivred: any = [];
    ordersPlaced: any = [];
  
    constructor(private adminService: AdminService, private fb: FormBuilder) { }
  
    ngOnInit(): void {
  
     
      this.getAllOrders()
    }
  
  
  
    getAllOrders() {
  
      this.adminService.getAllOrderPending().subscribe(
        (res) =>{
  
          this.ordersPending = res
        }
      )
  
      this.adminService.getAllOrderShipped().subscribe(
        (res) => {
  
          this.ordersShipped = res
        }
      )
  
      this.adminService.getOrderDelivered().subscribe(
        (res) => {
  
          this.ordersDelivred= res
        }
      )
  
      this.adminService.getAllOrderPlaced().subscribe(
        (res) => {
  
          this.ordersPlaced = res
        }
      )
  
  
  
  
    }
    isModalOpenChangeStatusFromPlaced: boolean = false;
    isModalOpenChangeStatusFromShipped: boolean = false;
    idOrderToChangeStatusFromPlaced=-1
    idOrderToChangeStatusFromShipped=-1
  
    emailToSend: string | undefined;
  
    idOrderSelcted = -1
  
    onSelect(event: Event,orderId:number,email:string) {
      const selectedOption = (event.target as HTMLSelectElement).value;
      console.log('Selected option:', selectedOption);
      // Perform any other actions based on the selected option
      this.emailToSend = email; // Store the email to display in the modal
  
      this.idOrderSelcted = orderId 
  
      console.log("User slected >> "+this.idOrderSelcted);
      
  
      this.toggleModalChangeStatusFromPlaced(orderId) ;
    }
  
    toggleModalChangeStatusFromPlaced(idOrder: number) {
      this.idOrderToChangeStatusFromPlaced = idOrder
      this.isModalOpenChangeStatusFromPlaced = !this.isModalOpenChangeStatusFromPlaced;
    }
  
  
    confirmChangeFromPlaced() {
  
      this.adminService.setOrderShipped(this.idOrderSelcted).subscribe(
        (res)=>{
          console.log("Change to Shipped success");
          this.getAllOrders()
          this.isModalOpenChangeStatusFromPlaced = !this.isModalOpenChangeStatusFromPlaced;
  
  
          
        }
        ,(err)=>
        {
          console.log("Error >> "+err);
          
        })
      
      }
  
  
      
    onSelectFromShipped(event: Event,orderId:number,email:string) {
      const selectedOption = (event.target as HTMLSelectElement).value;
      console.log('Selected option:', selectedOption);
      // Perform any other actions based on the selected option
      this.emailToSend = email; // Store the email to display in the modal
  
      this.idOrderSelcted = orderId 
  
      console.log("User slected >> "+this.idOrderSelcted);
      
  
      this.toggleModalChangeStatusFromShipped(orderId) ;
    }
  
    toggleModalChangeStatusFromShipped(idOrder: number) {
      this.idOrderToChangeStatusFromShipped= idOrder
      this.isModalOpenChangeStatusFromShipped = !this.isModalOpenChangeStatusFromShipped;
    }
  
  
      confirmChangeFromShipped() {
  
        console.log("Rak brkti ealaia");
        
        this.adminService.setOrderDelivered(this.idOrderSelcted).subscribe(
          (res)=>{
            console.log("Change to Delivered success");
            this.getAllOrders()
            this.isModalOpenChangeStatusFromShipped = !this.isModalOpenChangeStatusFromShipped ;
            
          }
          ,(err)=>
          {
            console.log("Error >> "+err);
            
          })
        
        }
  
  
    
  
  }
  