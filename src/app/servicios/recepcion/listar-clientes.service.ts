import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { clientes } from 'src/app/modelos/clientes';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class ListarClientesService {
  private url = environment.apiUrl;
  
  getUserAll():Observable<clientes[]>{
    let direccion = this.url +'Clientes/ClientesList';
    return this.http.get<clientes[]>(direccion);
   }

  constructor(private http:HttpClient) { }
}
