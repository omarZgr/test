import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../storage/user-storage.service';
import { map } from 'rxjs';

const PATH = 'http://localhost:9023'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private userStrogae:UserStorageService){}

  login(username:string,password:string):any
  {
    console.log("Ana hna ");
    
    const headers = new HttpHeaders().set('Content-Type','application/json')  ;
    const body = {username,password} ;

    return this.http.post(PATH + '/authenticate',body,{headers,observe:'response'}).pipe(
      map((res:any)=>
      {
        const token = res.headers.get('authorization').substring(7);
        const user = res.body ;

        if(token && user)
        {
          this.userStrogae.saveToken(token);
          this.userStrogae.saveUser(user) ;
          return true ;
        }
        return false 
      })
    )
  }
 

}
