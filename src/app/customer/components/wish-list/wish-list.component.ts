import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {


  products: any = [];

    //TO modife from storage
    idUser = UserStorageService.getUserId();


  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    

    this.getAllFavorite()
  }


  getAllFavorite() {
    this.customerService.getAllFavorite(this.idUser).subscribe(
      (res) => {
        res.forEach((ele: any) => {

          ele.processedImg = 'data:image/jpeg;base64,' + ele.img; // Add comma after 'data:image/jpeg;base64,'
          this.products.push(ele);

        })
      }
    )
  }




  deleteFavoris(idProduct:number)
  {

    

    this.customerService.deleteFavoris(idProduct,this.idUser).subscribe(
      (res)=>{
        console.log("Ra brkti eala delete");
        console.log("Deleted Success !!");
        window.location.reload();

        
      }
      ,(err)=>
      {
        console.log("Ra brkti eala delete");
        console.log("Error >> "+err);
        window.location.reload();

        
      }
    )
  }
}
