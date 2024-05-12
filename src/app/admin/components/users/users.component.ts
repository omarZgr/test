import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: any = [];


  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
   
    this.getAllUser();
  }


  getAllUser() {
    this.users= []
    this.adminService.getAllUser().subscribe(
      (res) => {
        res.forEach((ele: any) => {


          console.log(ele);
          
          ele.processedImg = 'data:image/jpeg;base64,' + ele.img; // Add comma after 'data:image/jpeg;base64,'
          this.users.push(ele);

        });

      })
  }



}
