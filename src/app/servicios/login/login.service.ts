import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from 'src/app/modelos/usuario';
import { environment } from 'src/app/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tokenJWT } from 'src/app/modelos/tokenJWT';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router: Router) { }

  url = environment.apiUrl;

 ingresar(Usuario1: usuario):Observable<tokenJWT | boolean>{
    let direccion = this.url +'Login/login';
    const hash = crypto.MD5(Usuario1.password);
    Usuario1.password = hash.toString();
     return this.http.post<tokenJWT | boolean>(direccion, Usuario1);
   } 
 

   cerrarSesion()
   {
     localStorage.clear();
     this.router.navigate(['/'])
   }

  } 
   


