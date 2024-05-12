
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../customer/service/customer.service';
import { AdminService } from '../../service/admin.service';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { AppComponent } from '../../../app.component';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  idUser = UserStorageService.getUserId();






  imgUser = ""
  firstName = ""
  lastName = ""
  userName = ""
  email = ""
  dateCreation = ""
  password = ""


  showNotificationChangeSucess: boolean = false;


  selectedFile!: File;

  imagePreview!: string | ArrayBuffer | null

  profileForm !: FormGroup


  userNameExist = false
  emailExist = false
  passwordNoMatch = false
  urlOfImg: any;


  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private appComponent: AppComponent) {


    console.log("(Avant CONS ) firstName >> " + this.firstName);

    console.log("construduto");
    this.getUser()


    console.log("(After CONS ) firstName >> " + this.firstName);



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

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    if (password && rePassword && password.value !== rePassword.value) {
      return { 'passwordMismatch': true };
    }

    this.passwordNoMatch = true
    return null;
  }

  async getUser() {

    console.log("Avant appele");


    try {
      const res = await this.adminService.findUserById(this.idUser).toPromise();

      this.email = res.email
      this.firstName = res.firstName;
      this.lastName = res.lastName;
      this.userName = res.userName;
      //  this.password = res.password;
      this.dateCreation = res.dateCreation;
      this.imgUser = 'data:image/jpeg;base64,' + res.img;
      this.urlOfImg = res.img;

    } catch (error) {
      console.error("Error occurred while fetching user:", error);
    }


    console.log("Inside getUSER() --->> " + this.firstName);


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




  updateUser() {

    if (this.profileForm.valid) {

      let data = { "id": 5, "firstName": "", "lastName": "", "userName": "", "email": "", "password": "", "img": this.selectedFile };

      data.id = this.idUser
      data.firstName = this.profileForm.get('firstName')?.value
      data.lastName = this.profileForm.get('lastName')?.value
      data.userName = this.profileForm.get('userName')?.value
      data.email = this.profileForm.get('email')?.value
      data.password = this.profileForm.get('password')?.value


      console.log("Value of data :");
      console.dir(data)

      const formData2: FormData = new FormData();

      if (this.selectedFile != undefined)
        formData2.append('img', this.selectedFile);
      else {
        const blob = this.dataURLToBlob(this.imgUser); // or this.urlOfImg
        formData2.append('img', blob);
      }



      formData2.append('firstName', this.profileForm.get('firstName')?.value);
      formData2.append('lastName', this.profileForm.get('lastName')?.value);
      formData2.append('userName', this.profileForm.get('userName')?.value);
      formData2.append('email', this.profileForm.get('email')?.value);
      formData2.append('password', this.profileForm.get('password')?.value);

      formData2.append('id', this.idUser.toString()); // Convert number to string

      this.adminService.changeProfil(formData2).subscribe(
        (res) => {
          console.log("Change Success !!");
          console.log("formData2 >> " + data);
          this.emailExist = false
          this.userNameExist = false

          UserStorageService.signOut();
          this.appComponent.isAdminLoggedIn = false;
          this.appComponent.isCustomerLoggedIn = false;

          this.router.navigateByUrl('login')
          this.showNotificationChangeSucess = true;
          setTimeout(() => {
            this.showNotificationChangeSucess = false;
          }, 3000); // Hide notification after 3 seconds






        }, (err) => {
          console.log("Error >> " + err);
          console.log("error.message >> " + err.err);

          if (err.status == 404)
            this.emailExist = true
          if (err.status == 409)
            this.userNameExist = true






        }
      )





    }
    else
      console.log("INVALID FORM");


  }


  passwordForm!: FormGroup;
  hidePassword: boolean = true;


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }


  dataURLToBlob(dataURL: string): Blob {
    const parts = dataURL.split(',');
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  }

}


