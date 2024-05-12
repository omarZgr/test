import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../admin/service/admin.service';
import { CustomerService } from '../../service/customer.service';
import { UserStorageService } from '../../../services/storage/user-storage.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {


  idUser!: number;
  idOrder!: number

  cards: any = [];

  couponForm !: FormGroup
  adressForm !: FormGroup





  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.couponForm = this.fb.group(
      {
        "code": [null, Validators.required]
      })

    this.adressForm = this.fb.group(
        {
          "adress" : [null,Validators.required],
          "description" : [null],
        }
      )
    


    this.route.params.subscribe(params => {

      // after login service , we can get orther from stroage
      // this.idUser = +params['idUser'];
      this.idUser =    UserStorageService.getUserId();


      // after login service , we can get orther from stroage

      this.idOrder = 16


    })


    this.getAllCards();

    this.handleAmount() ;
    

  }




  totalAmount = ""
  discount = ""
  payment = ""

  coupon = false


  getAllCards() {
    this.cards = []
    this.customerService.getCartOfOrderPending(this.idUser).subscribe(
      (res) => {
        res.forEach((ele: any) => {

          //  console.log("reuslt >> "+ele.id);
          ele.processedImg = 'data:image/jpeg;base64,' + ele.productDto.byteImg; // Add comma after 'data:image/jpeg;base64,'
        
          this.idOrder = res[0].orderDto.id 

          

          this.cards.push(ele);

        });
      })

  }


  codeExist = false


  applyCoupon() {
    this.customerService.applyCoupon(this.idOrder, this.couponForm.get("code")?.value).subscribe(
      (res) => {
        console.log("succes apply Coupon");
        this.codeExist = false
        this.getAllCards();
        window.location.reload();




      }
      , (err) => {
        console.log("Error >> " + err);
        this.codeExist = true

      }
    )
  }

  incrementQuantity(idCarteItem: number) {

    this.customerService.incrementQuantity(idCarteItem).subscribe(
      (res) => {
        console.log("ince Success !!");
        this.getAllCards();
        this.handleAmount() ;


      }
      , (err) => {
        console.log("Error >> " + err);
        this.handleAmount() ;


      }
    )
  }

  async decrementQuantity(idCartItem: number) {
    console.log("Dec -------");
  
    try {
      // Retrieve quantity asynchronously
      const quantity = await this.customerService.getQuantityInCard(idCartItem).toPromise();
      console.log("quantity ------- " + quantity);
  
      // Check if quantity is greater than 1
      if (quantity > 1) {
        // Decrement quantity asynchronously
        await this.customerService.decrementQuantity(idCartItem).toPromise();
        console.log("dec Success !!");
        this.getAllCards();
        this.handleAmount() ;

      } else {

        console.log("Quantity is already 1, cannot decrement further.");
        this.toggleModalDelete(idCartItem)
        this.handleAmount() ;

      }
    } catch (err) {
      console.log("Error >> " + err);
      this.handleAmount() ;

    }
  }
  

  isModalOpenDelete: boolean = false;
  cardToRemove = -1


  toggleModalDelete(cardId: number) {
    this.cardToRemove = cardId
    this.isModalOpenDelete = !this.isModalOpenDelete;
  }


  
  confirmDelete() {
    // Implement delete logic here
    this.customerService.deleteCard(this.cardToRemove).subscribe(
      (res) => {
        console.log("Deleting product... " + this.cardToRemove);
        // Reload the page
        window.location.reload();
      },
      (err) => {
        console.log("This card does not exist");
        // Reload the page
        window.location.reload();
      }
    );
  
    // Close the modal
    this.toggleModalDelete(this.cardToRemove);
  }
  

  placerOrder()
  {

    this.customerService.placerOrder(this.idUser,this.idOrder,this.adressForm.get("adress")?.value,this.adressForm.get("description")?.value).subscribe(
      (res)=>
      {
        console.log("Place order --- ");
        this.router.navigateByUrl("/customer/home");

        
      }
      ,(err)=>
      {
        console.log("Error >> ");
        console.dir(err)
        
      }
    )
  }

  handleAmount()
  {
    this.customerService.getCartOfOrderPending(this.idUser).subscribe(
      (res)=>
      {
       this.discount= res[0].orderDto.discount ;
       this.payment=  res[0].orderDto.payment ;
       this.totalAmount=res[0].orderDto.totalAmount ;
       this.coupon= res[0].orderDto.couponDto ;
      })
  }

  

}


