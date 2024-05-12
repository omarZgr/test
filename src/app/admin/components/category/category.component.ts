import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categories: any = [];

  categoryForm !: FormGroup

  categoryExist = false


  constructor(private adminService: AdminService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.categoryForm = this.fb.group(
      {
        name: [null, Validators.required],
        description : [null, Validators.required]
      }
    )
    this.getAllCategories()
  }

  getAllCategories() {
    this.adminService.getCategories().subscribe(
      (res) => {
        console.log(res);

        this.categories = res
      }
    )
  }

  addCategory()
  {
    console.log(this.categoryForm.value);

    this.adminService.addCategory(this.categoryForm.value).subscribe(
      (res)=>
      {
        console.log("add Category Succes");
        this.categoryExist=false
        this.getAllCategories() ;
        
      },
      (err)=>
      {
       
        this.categoryExist=true 
        
      })
    
  }


}
