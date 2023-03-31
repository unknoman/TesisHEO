import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from 'src/app/modelos/usuario';
import { environment } from 'src/app/enviorment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tokenJWT } from 'src/app/modelos/tokenJWT';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router: Router) { }

  url = environment.apiUrl;

 ingresar(Usuario1: usuario):Observable<tokenJWT | boolean>{
    let direccion = this.url +'Login/login';
     return this.http.post<tokenJWT | boolean>(direccion, Usuario1);
   } 
 

   cerrarSesion()
   {
     localStorage.clear();
     this.router.navigate(['/'])
   }

  } 
   


