import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token'
const USER = 'ecom-user'


@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  
  constructor() { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }


  public saveUser(user: string): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): any {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    const userDataString = localStorage.getItem(USER) ?? "";

    return JSON.parse(userDataString);
 //  return userDataString ;
}


  static getUserId(): any {
    const user = this.getUser();

    if (user == null) return '';
    else
     return  user.userId;
  }


  static getUserRole(): any {
    const user = this.getUser();

    console.log("user >>>>>>>> "+user);
    console.log("///////////////");
    
    
    console.dir(user)

    

    if (user == null) return '';
    else
     return user.role;
  }


  static isAdminLoggedIn(): boolean {
    
    console.log("From storage :: this.getToken --> "+this.getToken());

    console.log("=======================================");

    console.log("From storage :: this.getUserRole() --> "+this.getUserRole());


    
    

    if(this.getToken() == null) return false ;
    else

    return this.getUserRole() == 'ADMIN'
     
   }

  static isCustomerLoggedIn(): boolean {
    
   
    if(this.getToken() == null) return false ;
    else

    return this.getUserRole() == 'CUSTOMER'
     
   }

   static signOut():void
   {
    window.localStorage.removeItem(TOKEN)
    window.localStorage.removeItem(USER)
   }
}
