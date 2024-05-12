import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';


const PATH = 'http://localhost:9023/api/customer'


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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

  addToPanier(idUser:number,idProduct:number):Observable<any>
  {
    console.log("idUSer : "+idUser);
    console.log("idProduct : "+idProduct);
    
    return this.http.get(PATH +`/addProduct/${idUser}/${idProduct}`, { headers: this.createAuthorizationHeader() }); 
  }

  initOrder(idUser:number):Observable<any>
  {
    return this.http.get(PATH +`/order/init/${idUser}`, { headers: this.createAuthorizationHeader() }); 
  }

  getAllFavorite(idUser:number):Observable<any>
  {
    return this.http.get(PATH +`/favoris/${idUser}`, { headers: this.createAuthorizationHeader() }); 
  }


  addFavoris(idUser:number,idProduct:number):Observable<any>
  {

    
    return this.http.get(PATH +`/favoris/${idProduct}/${idUser}`, { headers: this.createAuthorizationHeader() }); 
  }

  //////// cart 

  getCartOfOrderPending(idUser:number):Observable<any>
  {
    return this.http.get(PATH +`/order/pending/${idUser}`, { headers: this.createAuthorizationHeader() }); 
  }

  applyCoupon(orderId:number,code:string):Observable<any>
  {
    return this.http.get(PATH +`/coupon/${code}/${orderId}`, { headers: this.createAuthorizationHeader() }); 
  }

  incrementQuantity(idCarteItem:number):Observable<any>
  {
    return this.http.get(PATH +`/carteItemIn/${idCarteItem}`, { headers: this.createAuthorizationHeader() }); 
  }

  decrementQuantity(idCarteItem:number):Observable<any>
  {
    return this.http.get(PATH +`/carteItemDe/${idCarteItem}`, { headers: this.createAuthorizationHeader() }); 
  }

  getQuantityInCard(idCard:number):Observable<any>
  {
    return this.http.get(PATH +`/card/${idCard}`, { headers: this.createAuthorizationHeader() }); 
  }

  deleteCard(idCard:number):Observable<any>
  {
    return this.http.delete(PATH +`/card/${idCard}`, { headers: this.createAuthorizationHeader() }); 
  }
  

  placerOrder(idUser:number,idOrder:number,adress:string,description:string):Observable<any>
  {
    return this.http.get(PATH +`/order/${idUser}/${idOrder}/${description}/${adress}`, { headers: this.createAuthorizationHeader() }); 
  }


  ///////////wishList

  deleteFavoris(idProduct:number,idUser:number):Observable<any>
  {
    return this.http.delete(PATH +`/favoris/${idProduct}/${idUser}`, { headers: this.createAuthorizationHeader() }); 
  }


  ////// Profile


  findUserById(idUser:number):Observable<any>
  {
    return this.http.get(PATH + `/profile/${idUser}`, { headers: this.createAuthorizationHeader() })
  }

  changeProfil(userDto:any):Observable<any>
  {
    return this.http.post(PATH + `/changeProfile`,userDto, { headers: this.createAuthorizationHeader() })
  }


  ////////// Order

  getOrderPending(idUser:number):Observable<any>
  {
    return this.http.get(PATH +`/order/pendingOrder/${idUser}`, { headers: this.createAuthorizationHeader() }); 
  }

  getOrderPlaced(idUser:number):Observable<any>
  {
    return this.http.get(PATH +`/order/placed/${idUser}`, { headers: this.createAuthorizationHeader() }); 
  }


  getOrderShipped(idUser:number):Observable<any>
  {
    return this.http.get(PATH +`/order/shipped/${idUser}`, { headers: this.createAuthorizationHeader() }); 
  }

  getOrderDelivered(idUser:number):Observable<any>
  {
    return this.http.get(PATH +`/order/delivered/${idUser}`, { headers: this.createAuthorizationHeader() }); 
  }








  ////////////// Security

  private createAuthorizationHeader(): HttpHeaders {

    return new HttpHeaders().set('Authorization', 'Bearer ' + UserStorageService.getToken());
  }


}
