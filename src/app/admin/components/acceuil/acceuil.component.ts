import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent {


  products: any = [];

  searchForm !: FormGroup
  isModalOpenDelete: boolean = false;

  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group(
      { title: [null, Validators.required] }
    )
    this.getAllProducts();
  }

  getAllProducts() {
    this.products= []
    this.adminService.getAllProduct().subscribe(
      (res) => {
        res.forEach((ele: any) => {

          ele.processedImg = 'data:image/jpeg;base64,' + ele.byteImg; // Add comma after 'data:image/jpeg;base64,'
          this.products.push(ele);

        });

      })
  }



  getProductByName() {

    this.products = [];

    const searchBy = this.searchForm.get('title')?.value

    if (searchBy) {
      this.adminService.searchProduct(searchBy).subscribe(
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


  productToUpdate = -1
  productToRemove = -1
  isModalOpenUpdate: boolean = false;
  selectedFile!: File;

  productFormToUpdate !: FormGroup

  categories: any[] = []; // Initialize categories array


  ProductNameAlreadyExist = false


  product = {

    "name": "",
    "description": "",
    "price": "",
    "processedImg": "",
    "categoryDto":
    {
      "name": "",
    }

  }


  toggleModalUpdate(productId: number) {

    this.productToUpdate = productId

    console.log("Product SELCTED >> " + this.productToUpdate);

    this.getProductById(productId)

    this.getAllCategories()








    this.isModalOpenUpdate = !this.isModalOpenUpdate;

  }

  getProductById(productId: number) {
    this.adminService.getProductById(productId).subscribe(
      (res) => {
        this.product.name = res.name
        this.product.description = res.description
        this.product.price = res.price
        this.product.categoryDto.name = res.categoryDto.name

        this.product.processedImg = 'data:image/jpeg;base64,' + res.byteImg // Add comma after 'data:image/jpeg;base64,'

      }
    )

    this.productFormToUpdate = this.fb.group(
      {
        processedImg: [this.product.processedImg, Validators.required],
        name: [this.product.name, Validators.required],
        description: [this.product.description, Validators.required],
        price: [this.product.price, Validators.required],
        categoryId: [this.product.categoryDto.name, Validators.required],
      }
    )


  }


  getAllCategories() {
    this.adminService.getCategories().subscribe(
      (res) => { this.categories = res }
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


  async confirmUpdate() {

    const formData = this.productFormToUpdate.value;




    const processedImg = formData.processedImg;
    const name = formData.name;
    const description = formData.description;
    const price = formData.price;
    const categoryId = formData.categoryId;


    console.log("processedImg >>> " + processedImg);
    console.log("name >>> " + name);
    console.log("description >>> " + description);
    console.log("price>>> " + price);
    console.log("categoryName >>> "+categoryId);


    let data = { "id": 5, "name": "", "description": "", "price": 4,"productDto": { "id": -1 } };



    data.id = this.productToUpdate
    data.name = name
    data.description = description
    data.price = price
    data.productDto.id = categoryId


    console.log("Value of data >>> " + data);

    console.log(data.id);
    console.log(data.name);
    console.log(data.description);
    console.log(data.price);
    console.log(data.productDto.id);

    const  formData2 : FormData = new FormData() ;


    formData2.append('img',this.selectedFile) ;
    formData2.append('categoryDto.id',categoryId) ;
    formData2.append('name',name) ;
    formData2.append('description',description) ;
    formData2.append('price',price) ;

    formData2.append('id', this.productToUpdate.toString()); // Convert number to string





    this.adminService.updateProduct(formData2).subscribe((res) => {

      console.log("u[date] Product Successfully !!");
      this.router.navigateByUrl("/admin/acceuil");
      this.ProductNameAlreadyExist = false
      this.getAllProducts();
      this.isModalOpenUpdate = !this.isModalOpenUpdate;



    }, (err) => {
      this.ProductNameAlreadyExist = true
      console.log("Error");
      console.log(err);



    }



    )





  }


  toggleModalDelete(productId: number) {
    this.productToRemove = productId
    this.isModalOpenDelete = !this.isModalOpenDelete;
  }

  confirmDelete() {
    // Implement delete logic here

    this.adminService.deleteProductId(this.productToRemove).subscribe(
      (res) => {
        console.log("Deleting product... " + this.productToRemove);
        this.getAllProducts()
        this.isModalOpenDelete = !this.isModalOpenDelete;


      }, (err) => {
        //  this.toggleModal(this.faqToRemove)
        console.log("This product not exist");
        this.getAllProducts()


      })


    // You can add your delete logic here
    this.toggleModalDelete(this.productToRemove); // Close the modal after delete
  }








}
