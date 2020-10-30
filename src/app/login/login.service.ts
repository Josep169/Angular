import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor() { }

  save(credentials: any): void {
    console.log(credentials);
    localStorage.setItem("token",btoa(`${credentials.usuario}:${credentials.pass}`));
  }

  getAuthHeaders():HttpHeaders {
    let token = localStorage.getItem("token");
    if(token){
      return new HttpHeaders({"Authorization": "Basic " + localStorage.getItem("token")})
    }

  }
}