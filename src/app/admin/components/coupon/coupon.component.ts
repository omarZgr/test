import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.css'
})
export class CouponComponent {

  couponForm !: FormGroup
  coupons: any = [];

  CouponNameExist = false


  constructor(private adminService: AdminService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.couponForm = this.fb.group(
      {
        name: [null, Validators.required],
        code: [null, Validators.required],
        discount: [null, Validators.required],
        expirationDate: [null, Validators.required],

      })

      console.log("Bsmlah");
      

      this.getCoupons()



  }


  getCoupons() {
    this.adminService.getCoupons().subscribe(
      (res) => { 
        console.log("I get some coupons");

        console.log(res.length);
        console.log(res);
        
        
        this.coupons = res }
    )
  }


  addCoupon()
  {

    this.coupons = [];


      this.adminService.addCoupon(this.couponForm.value).subscribe(
        (res) => {
          console.log(res);
          this.CouponNameExist=false 
          this.getCoupons()  ;
    
        },(err)=>
        {
          this.CouponNameExist=true 
          this.getCoupons()  ;


        }
      );
  
    
  }




}
