import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../service/admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {


  selectedFile!: File;

  imagePreview!: string | ArrayBuffer | null

  productForm !: FormGroup

  categories: any[] = []; // Initialize categories array

  productNameExist = false


  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.productForm = this.fb.group(
      {
        categoryId: [null, Validators.required],
        name: [null, Validators.required],
        price: [null, Validators.required],
        description: [null, Validators.required],

      })

      this.getAllCategories()



  }

  getAllCategories() {
    this.adminService.getCategories().subscribe(
      (res) => { this.categories = res }
    )
  }


  addProduct() {


    if(this.productForm.valid)
    {
      const  formData : FormData = new FormData() ;

      console.log("selectedFile >>> "+this.selectedFile);
      console.log("categoryId >>> "+this.productForm.get('categoryId')?.value);
      console.log("name>>> "+this.productForm.get('name')?.value);
      console.log("description >>> "+this.productForm.get('description')?.value);
      console.log("price >>> "+this.productForm.get('price')?.value);
      

      formData.append('img',this.selectedFile) ;
      formData.append('categoryDto.id',this.productForm.get('categoryId')?.value) ;
      formData.append('name',this.productForm.get('name')?.value) ;
      formData.append('description',this.productForm.get('description')?.value) ;
      formData.append('price',this.productForm.get('price')?.value) ;

      this.adminService.addProduct(formData).subscribe((res)=>{

          console.log("Add Product Successfully !!");
          this.router.navigateByUrl("/admin/acceuil");
          this.productNameExist = false

      
        },(err)=>
        {
          this.productNameExist = true
          console.log("Error");


        }



      )
    
    }
    
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

}
