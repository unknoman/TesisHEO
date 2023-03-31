import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtserviceService {

  constructor() { }

  decodificartoken(token: string) : any{
   // const tokenx = localStorage.getItem(token);
   const decodedToken: any = jwt_decode(token);
    if (decodedToken) 
       return decodedToken;
     else 
    return false;
  } 


}
