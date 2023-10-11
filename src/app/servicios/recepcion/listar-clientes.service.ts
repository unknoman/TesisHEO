import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { clientes } from 'src/app/modelos/clientes';
import { environment } from 'src/app/environment';
import { pagos } from 'src/app/modelos/pagos';
import { clientesCrearDTO } from 'src/app/modelos/clienteCrearDTO';
import { estadoPagos } from 'src/app/modelos/estadoPagos';
import { cambiarEstadoP } from 'src/app/modelos/cambiarEstadoP';

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

  listarEstadoPagos(){
    let direccion = this.url +'pagos/listarEstadoPagos';
    return this.http.get<estadoPagos[]>(direccion);
  }


  actualizarPagos(pago:cambiarEstadoP){
    let direccion = this.url +'pagos/cambiarEstadoPago';
    return this.http.patch(direccion, pago)
  }

   borrarCliente(id:number){
    let direccion = this.url +'Clientes/ClienteBorrar';
    direccion += `?id=${id}`;
    return this.http.delete(direccion);
   }


   
  actualizarCliente(cliente: clientesCrearDTO){
    let direccion = this.url +'Clientes/ClientesModificar';
    return this.http.patch(direccion, cliente);
   }



   getUserAllSimple(instalado : number):Observable<clientes[]>{
    let direccion = this.url +'Clientes/ClienteInstalarSimple';
    direccion += `?estadoInstalado=${instalado}`;
    return this.http.get<clientes[]>(direccion);
   }


  constructor(private http:HttpClient) { }
}
