import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  userLoggedIn: boolean = false;
  userLogged!: Usuario;

  constructor(private _http:HttpClient) { }

  readonly URL_API = 'http://127.0.0.1:5000/api/users/login';

  public getToken():string{
    return JSON.parse(sessionStorage.getItem("token")!);
  }

  public login(email: string, password: string):Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }) 
    } 
    let body = JSON.stringify({ email: email, password: password });
    console.log(body);
    return this._http.post(this.URL_API, body, httpOption);
  }

  public logout() {
    // reseteo las propiedades del service que indican 
    // que un usuari esta logueado y cual es el usuario logueado
    this.userLogged = new Usuario();
    this.userLoggedIn = false; 
    sessionStorage.removeItem("token"); 
  }  
}
