import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminService } from '../../../admin/service/admin.service';
import { CustomerService } from '../../service/customer.service';
import { UserStorageService } from '../../../services/storage/user-storage.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

   idOrderPending :any



  //TO modife from storage
  idUser = UserStorageService.getUserId();


  products: any = [];
  productsFavoris: any = [];


  searchForm !: FormGroup

  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group(
      { title: [null, Validators.required] }
    )
    this.getAllProducts();

    this.checkOrderPendingExist()

    this.getAllFavorite()
  }

  getAllProducts() {
    this.products = []
    this.customerService.getAllProduct().subscribe(
      (res) => {
        res.forEach((ele: any) => {


          ele.processedImg = 'data:image/jpeg;base64,' + ele.img; // Add comma after 'data:image/jpeg;base64,'
          this.products.push(ele);


        });

      })
  }


  getProductByName() {

    this.products = [];

    const searchBy = this.searchForm.get('title')?.value

    if (searchBy) {
      this.customerService.searchProduct(searchBy).subscribe(
        (res) => {
          console.log(res);
          res.forEach((ele: any) => {
            console.log(ele);
            ele.processedImg = 'data:image/jpeg;base64,' + ele.byteImg; // Add comma after 'data:image/jpeg;base64,'
            this.products.push(ele);
          });
        }
      );
    }
    else
      this.getAllProducts()

  }

  getFaqByProductId(productId: number) {
    console.log("productId >>> " + productId);

    this.router.navigate(['/faq' + productId]);

  }



  checkOrderPendingExist() {

    this.customerService.getCartOfOrderPending(this.idUser).subscribe(
      (res) => {
        console.log("Order Pending already Exist !");
        console.log("PENDIIIIIIIING >>> "+res);
        console.dir(res)
        this.idOrderPending=res.id

        


      }, (err) => {

        console.log("Error >> ", err);

        // Check if error is 406 Not Acceptable
        if (err.status === 406) {
          console.log("Error: 406 Not Acceptable");
          console.log("IdUSER>>> " + this.idUser);

          this.customerService.initOrder(this.idUser).subscribe((res) => {
            console.log("RESULT OF INIT >>> " + res);
            console.dir(res)
            this.idOrderPending=res.id
            

          }, (err) => {
            console.log("error in init >> " + err);
          })
          // Handle 406 error specific logic here
        } else {
          console.log("Unknown error occurred.");
        }
      }
    )
  }

  // Define properties to control the visibility of notifications
  showNotification: boolean = false;
  showProductExistNotification: boolean = false;
  showNotificationFavorisTrue: boolean = false;
  showNotificationCantFavorisFalse: boolean = false;

  addToCart(idProduct: number) {
    this.customerService.addToPanier(this.idUser, idProduct).subscribe(
      (res) => {
        console.log("Add Success !!");
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 3000); // Hide notification after 3 seconds
      },
      (err) => {
        console.log("Error:", err);
        // If product already exists, show the specific notification
        console.log("AM HERE");

        this.showProductExistNotification = true;
        setTimeout(() => {
          this.showProductExistNotification = false;
        }, 3000); // Hide notification after 3 seconds

        console.log("Error occurred while adding product:", err);

      }
    );
  }




  getAllFavorite() {
    this.customerService.getAllFavorite(this.idUser).subscribe(
      (res) => {
        res.forEach((ele: any) => {
          this.productsFavoris.push(ele.name);

        })
      }
    )
  }


  favoris(idProduct: any) {


    console.log("idProduct >>> " + idProduct);

    this.customerService.addFavoris(this.idUser, idProduct).subscribe(
      (res) => {
        console.log("----------add success");
        this.showNotificationFavorisTrue = true;
        setTimeout(() => {
          this.showNotificationFavorisTrue = false;
        }, 3000); // Hide notification after 3 seconds

      }
      , (err) => {
        console.log("------------Error:", err);

        if (err.status === 409) {

          this.showNotificationCantFavorisFalse = true;

          setTimeout(() => {
            this.showNotificationCantFavorisFalse = false;
          }, 3000); // Hide notification after 3 seconds

        }
          else
          {
            console.log("----------add success");
            this.showNotificationFavorisTrue = true;
            setTimeout(() => {
              this.showNotificationFavorisTrue = false;
            }, 3000); // Hide notification after 3 seconds

          }
        

      }
    )

  }







}
