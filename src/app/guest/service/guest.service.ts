import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const PATH = 'http://localhost:9023'

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http:HttpClient) { }


  
}
