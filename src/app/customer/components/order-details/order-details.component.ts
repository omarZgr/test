import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../admin/service/admin.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class DetailsOrderComponent {

  
  idOrder!: number;

  cards: any = [];

  
   imgUser = ""
   firstName = ""
   lastName = ""
   userName = ""
   email = ""
   dateCreation = ""
  totalAmount: any;
  discount: any;
  payment: any;

  


  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {


    this.route.params.subscribe(params => {
      this.idOrder = +params['idOrder'];
      
    
    })


    this.getAllCards()  ;

    console.log("cards >> " + this.cards);

    console.log("AVant appele ----------------------------");
    
    this.getUser()

    console.log("After appele ----------------------------");

    
  }

   userDto :any

   async getUser() {

    console.log("Avant appele");

    
    try {
      const res = await this.adminService.getOrderByIdOrder(this.idOrder).toPromise();
  
    this.email= res[0].orderDto.userDto.email;
    this.firstName= res[0].orderDto.userDto.firstName;
    this.lastName= res[0].orderDto.userDto.lastName;
    this.userName= res[0].orderDto.userDto.userName;
    this.dateCreation= res[0].orderDto.userDto.dateCreation;
    this.imgUser= 'data:image/jpeg;base64,'   + res[0].orderDto.userDto.img;

    this.totalAmount = res[0].orderDto.totalAmount ;
    this.discount = res[0].orderDto.discount ;
    this.payment = res[0].orderDto.payment ;
    

      
    } catch (error) {
      console.error("Error occurred while fetching user:", error);
    }

    console.log("Email >>>> "+this.email);
    console.log("payment >>>> "+this.payment);
    console.log("date >>>> "+this.dateCreation);


    

  }
  

  getAllCards() {
    this.cards= []
    this.adminService.getOrderByIdOrder(this.idOrder).subscribe(
      (res) => {
        res.forEach((ele: any) => {

        //  console.log("reuslt >> "+ele.id);
          ele.processedImg = 'data:image/jpeg;base64,' + ele.productDto.byteImg; // Add comma after 'data:image/jpeg;base64,'

          this.cards.push(ele);

        });
      })

  }










}
