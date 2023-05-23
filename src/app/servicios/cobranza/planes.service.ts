import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { planes } from 'src/app/modelos/planes';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(private http:HttpClient) { }


  private url = environment.apiUrl;
  
  getPlanesAll():Observable<planes[]>{
    let direccion = this.url +'planes/planesList';
    return this.http.get<planes[]>(direccion);
   }
   
}
