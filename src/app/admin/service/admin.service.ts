import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const PATH = 'http://localhost:9023/api/admin'


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  ///// Acceuil 

  getAllProduct():Observable<any>
  {
    return this.http.get(PATH +"/products", { headers: this.createAuthorizationHeader() }); 
  }

  searchProduct(productName:string):Observable<any>
  {
    console.log("value of productName ::  "+productName);
    
    return this.http.get(PATH +`/product/search/${productName}`, { headers: this.createAuthorizationHeader() }); 

  }

  ///// Category

  getCategories():Observable<any>
  {
    return this.http.get(PATH +"/categories", { headers: this.createAuthorizationHeader() }); 

  }

  addCategory(category:any):Observable<any>
  {
    return this.http.post(PATH + "/category",category, { headers: this.createAuthorizationHeader() }) ;
  }

  getFaqByProductId(productId:number):Observable<any>
  {
    
    return this.http.get(PATH +`/faq/${productId}`, { headers: this.createAuthorizationHeader() }); 

  }

  ///// Product 

  addProduct(productDto: any): Observable<any> {
    
    return this.http.post(PATH + '/product', productDto, { headers: this.createAuthorizationHeader() });
  }

  updateProduct(productDto: any): Observable<any> {
    
    return this.http.put(PATH + '/product/update', productDto, { headers: this.createAuthorizationHeader() });
  }

  deleteProductId(productId:number):Observable<any>
  {
    return this.http.delete(PATH + `/product/delete/${productId}`, { headers: this.createAuthorizationHeader() })
  }

  //// Coupons 

  getCoupons():Observable<any>
  {
    return this.http.get(PATH +"/coupons", { headers: this.createAuthorizationHeader() }); 

  }

  addCoupon(category:any):Observable<any>
  {
    return this.http.post(PATH + "/coupon",category, { headers: this.createAuthorizationHeader() }) ;
  }


  ///// Product --- FAQ

  addFaq(faqDto:any):Observable<any>
  {
    return this.http.post(PATH + "/faq",faqDto, { headers: this.createAuthorizationHeader() }) ;
  }

  getProductById(productId:number):Observable<any>
  {
    
    return this.http.get(PATH +`/product/${productId}`, { headers: this.createAuthorizationHeader() }); 

  }

  getAllFaqsByProductId(productId:number):Observable<any>
  {
    
    return this.http.get(PATH +`/faq/${productId}`, { headers: this.createAuthorizationHeader() }); 

  }

  deleteFaqById(faqId:number):Observable<any>
  {
    return this.http.delete(PATH + `/faq/delete/${faqId}`, { headers: this.createAuthorizationHeader() })
  }

  getFaqById(faqId:number):Observable<any>
  {
    
    return this.http.get(PATH +`/faq/search/${faqId}`, { headers: this.createAuthorizationHeader() }); 

  }

  updateFaq(faqDto:any):Observable<any>
  {
    return this.http.put(PATH + "/faq/update",faqDto, { headers: this.createAuthorizationHeader() }) ;
  }


  getFaqByQuestion(faqQuestion:string):Observable<any>
  {
    
    return this.http.get(PATH +`/faq/question/${faqQuestion}`, { headers: this.createAuthorizationHeader() }); 

  }

////////// Orders 


getAllOrderPending():Observable<any>
  {
    
    return this.http.get(PATH +`/order/pending`, { headers: this.createAuthorizationHeader() }); 

  }

  
  getAllOrderShipped():Observable<any>
{
  
  return this.http.get(PATH +`/order/shipped`, { headers: this.createAuthorizationHeader() }); 

}


getAllOrderPlaced():Observable<any>
  {
    
    return this.http.get(PATH +`/order/placed`, { headers: this.createAuthorizationHeader() }); 

  }

  
  getOrderDelivered():Observable<any>
{
  
  return this.http.get(PATH +`/order/delivered`, { headers: this.createAuthorizationHeader() }); 

}



/////////// Orders ---- details

getOrderByIdOrder(idOrder:number):Observable<any>
{
  return this.http.get(PATH +`/cartItemOfOrder/${idOrder}`, { headers: this.createAuthorizationHeader() }); 

}


setOrderShipped(idOrder:number):Observable<any>
{
  return this.http.get(PATH +`/order/setShipped/${idOrder}`, { headers: this.createAuthorizationHeader() }); 

}


setOrderDelivered(idOrder:number):Observable<any>
{
  return this.http.get(PATH +`/order/setDelivered/${idOrder}`, { headers: this.createAuthorizationHeader() }); 

}

///////// Profile

findUserById(idUser:number):Observable<any>
{
  return this.http.get(PATH + `/profile/${idUser}`, { headers: this.createAuthorizationHeader() })
}

changeProfil(userDto:any):Observable<any>
{
  return this.http.post(PATH + `/changeProfile`,userDto, { headers: this.createAuthorizationHeader() })
}



///////////// Users

getAllUser():Observable<any>
{
  return this.http.get(PATH + `/users`, { headers: this.createAuthorizationHeader() })
}





  ////////////// Security

  private createAuthorizationHeader(): HttpHeaders {

    return new HttpHeaders().set('Authorization', 'Bearer ' + UserStorageService.getToken());
  }




}
