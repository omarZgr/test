import { Component } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../admin/service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from '../../../services/auth/signup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


  profileForm !: FormGroup

  selectedFile!: File;

  userNameExist = false
  emailExist = false
  passwordNoMatch = false
  urlOfImg: any;




  constructor(private signupService: SignupService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {

  }


  ngOnInit(): void {

    // console.log("ngOnInit");

    this.profileForm = this.fb.group(
      {
        firstName: [, Validators.required],
        lastName: [, Validators.required],
        userName: [, Validators.required],
        email: [, [Validators.required, Validators.email]],
        password: [, Validators.required],
      }
    )


  }

  previewImage(event: any): void {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      const preview = document.getElementById('preview') as HTMLImageElement;
      if (preview) {
        preview.src = reader.result as string;
        const previewContainer = document.querySelector('.image-preview');
        if (previewContainer) {
          previewContainer.classList.remove('hidden');
        }
      }
    };

    this.selectedFile = input.files[0]
    reader.readAsDataURL(input.files[0]);
  }


  signIn() {

    console.dir(this.profileForm.value)

    const formData2: FormData = new FormData();

    if (this.selectedFile != undefined)
      formData2.append('img', this.selectedFile);

    formData2.append('firstName', this.profileForm.get('firstName')?.value);
    formData2.append('lastName', this.profileForm.get('lastName')?.value);
    formData2.append('userName', this.profileForm.get('userName')?.value);
    formData2.append('email', this.profileForm.get('email')?.value);
    formData2.append('password', this.profileForm.get('password')?.value);




    this.signupService.signUp(formData2).subscribe(
      req => {
        console.log("Sign Up Succes")
        this.router.navigateByUrl("/login")
      }, (err) => {

        console.log("Error >> " + err);
        console.log("error.message >> " + err.err);
        console.dir(err)

        if (err.status == 406)
        {
          this.emailExist = true
          this.userNameExist = false


        }
        if (err.status == 409)
        {
          this.emailExist = false
          this.userNameExist = true
        }
        if(err.status==201)
        {
          console.log("Sign Up Succes")
          this.router.navigateByUrl("/login")
        }
      }

    )
  }


}


