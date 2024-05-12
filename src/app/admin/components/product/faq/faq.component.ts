import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../service/admin.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {

  haveFaq = false

  faqToRemove = -1
  faqToUpdate = -1


  questionUpdate = ""
  answerUpdte = ""





  productId!: number;

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


  faqForm !: FormGroup

  faqs: { question: string, answer: string, id: number }[] = [];


  faqFormToUpdate !: FormGroup




  faqQuestionExist = false
  QuestionAlreadyExist = false;


  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }




  ngOnInit(): void {

    this.faqForm = this.fb.group(
      {
        question: [null, Validators.required],
        answer: [null, Validators.required],

      })

    this.faqFormToUpdate = this.fb.group(
      {
        questionUpdate: [this.questionUpdate, Validators.required],
        answerUpdte: [this.answerUpdte, Validators.required],

      })



    this.route.params.subscribe(params => {
      this.productId = +params['idProduct'];


    })

    this.getProductById()
    this.getAllFaq()


  }

  getProductById() {
    
    this.adminService.getProductById(this.productId).subscribe(
      (res) => {
        this.product.name = res.name
        this.product.description = res.description
        this.product.price = res.price
        this.product.categoryDto.name = res.categoryDto.name

        this.product.processedImg = 'data:image/jpeg;base64,' + res.byteImg // Add comma after 'data:image/jpeg;base64,'

      }
    )


  }

  getAllFaq() {

    this.faqs = []
    this.adminService.getAllFaqsByProductId(this.productId).subscribe(
      (res) => {

        res.forEach((ele: any) => {
          let faq = { "question": ele.question, "answer": ele.answer, "id": ele.id }; // Create a new faq object for each iteration
          this.faqs.push(faq); // Push the new faq object to the faqs array
        });

        this.haveFaq = false;
      },
      (err) => {
        this.haveFaq = true;
      }
    );
  }


  addFaq() {
    const data = { "question": "string", "answer": "string", "productDto": { "id": "number" } };

    data.question = this.faqForm.get('question')?.value
    data.answer = this.faqForm.get('answer')?.value
    data.productDto.id = this.productId + ""

    this.adminService.addFaq(data).subscribe(
      (res) => {

        this.getAllFaq()


      },
      (err) => {
        console.log("ERRROR CONFLIT");

        this.faqQuestionExist = true
      })


  }


  isModalOpenDelete: boolean = false;
  isModalOpenUpdate: boolean = false;

  toggleModalDelete(faqId: number) {
    this.faqToRemove = faqId
    this.isModalOpenDelete = !this.isModalOpenDelete;
  }
  

  toggleModalUpdate(faqId: number) {

    this.faqToUpdate = faqId

    console.log("FAQ SELCTED >> "+this.faqToUpdate);
    


    this.adminService.getFaqById(this.faqToUpdate).subscribe(
      (res) => {

        this.questionUpdate = res.question
        this.answerUpdte = res.answer


      }
    )

    this.faqFormToUpdate = this.fb.group(
      {
        questionUpdate: [this.questionUpdate, Validators.required],
        answerUpdte: [this.answerUpdte, Validators.required],

      })



    this.isModalOpenUpdate = !this.isModalOpenUpdate;

  }



  async confirmUpdate() {
    let data = { "question": "string", "answer": "string", "id": 4, "productDto": { "id": -1 } };
    data.id = this.faqToUpdate;
    data.question = this.faqFormToUpdate.get('questionUpdate')?.value;
    data.answer = this.faqFormToUpdate.get('answerUpdte')?.value;

    try {
        // Get the FAQ by ID
        const res = await this.adminService.getFaqById(data.id).toPromise();

        // Assign the value of productDto.id to idUrg
        const idUrg = res.productDto.id;
        console.log("idUrg ??? " + idUrg);

        data.productDto.id=idUrg 

        // Update the FAQ
        await this.adminService.updateFaq(data).toPromise();

        console.log("Update Success !!");
        this.toggleModalUpdate(this.faqToUpdate); // Close the modal after update
        this.getAllFaq();
    } catch (err) {
        console.log("Error:", err);
        this.QuestionAlreadyExist = true;
    }
}


  confirmDelete() {
    // Implement delete logic here

    this.adminService.deleteFaqById(this.faqToRemove).subscribe(
      (res) => {
        console.log("Deleting product... " + this.faqToRemove);
        this.getAllFaq()
      }, (err) => {
        //  this.toggleModal(this.faqToRemove)
        console.log("This faq not exist");
        this.getAllFaq()


      })


    // You can add your delete logic here
    this.toggleModalDelete(this.faqToRemove); // Close the modal after delete
  }





}
