import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { clientes } from 'src/app/modelos/clientes';
import { environment } from 'src/app/environment';
import { pagos } from 'src/app/modelos/pagos';
import { clientesCrearDTO } from 'src/app/modelos/clienteCrearDTO';

@Injectable({
  providedIn: 'root'
})
export class ListarClientesService {
  private url = environment.apiUrl;
  

  crearCliente(cliente: clientesCrearDTO){
    let direccion = this.url +'Clientes/ClientesCrear';
    return this.http.put(direccion, cliente);
  }


  getUserAll(buscarPor : number = 0, buscarPor2: number = 0, buscarBarra : string = ""):Observable<clientes[]>{
    let direccion = this.url +'Clientes/ClientesList';
    direccion += `?numero=${buscarPor}&numero2=${buscarPor2}&dato=${buscarBarra}`;
    return this.http.get<clientes[]>(direccion);
   }

   getPagos(id:number){
    let direccion = this.url +'pagos/pagosList';
    direccion += `?id=${id}`;
    return this.http.get<pagos[]>(direccion);
   }


   borrarCliente(id:number){
    let direccion = this.url +'Clientes/ClienteBorrar';
    direccion += `?id=${id}`;
    return this.http.delete(direccion);
   }



  constructor(private http:HttpClient) { }
}
