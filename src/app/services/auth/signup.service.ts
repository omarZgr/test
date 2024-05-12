import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const PATH = 'http://localhost:9023'


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signUp(userDto: any): Observable<any> {
    return this.http.post(PATH+'/sign-up', userDto);
  }}
