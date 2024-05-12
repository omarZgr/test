import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  postForm !: FormGroup;

  userNotFound = false


  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.postForm = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.required],
      }
    )
  }

  OnSubmit(): void {
    const username = this.postForm.get('email')?.value
    const password = this.postForm.get('password')?.value

    this.loginService.login(username, password).subscribe(
      (res: any) => {
        console.log("login success");


        if (UserStorageService.isAdminLoggedIn()) {
          this.userNotFound = false

          this.router.navigateByUrl('admin/acceuil')
        }
        else
          console.log("Dkhlt hna");

        console.log(UserStorageService.isCustomerLoggedIn());

        if (UserStorageService.isCustomerLoggedIn()) {
          this.userNotFound = false


          this.router.navigateByUrl('customer/home')

        }



      }, (err: any) => {
        this.userNotFound = true

        console.log("Logggin error >>> " + err);
      }

    )

  }



}

