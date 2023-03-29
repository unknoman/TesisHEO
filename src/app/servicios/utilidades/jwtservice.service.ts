import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class JwtserviceService {

  constructor() { }

 /* decodificartoken(token: string) : any{
   // const tokenx = localStorage.getItem(token);
   const decodedToken = jwt.decode(token);
    if (decodedToken) 
       return decodedToken;
     else 
    return false;
  } 
*/

}
