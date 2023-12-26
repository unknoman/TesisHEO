import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment';
import { servicioT } from 'src/app/modelos/servicioT';
import { HttpClient } from '@angular/common/http';
import { servicioTCrear } from 'src/app/modelos/servicioTCrear';
import { respuesta } from 'src/app/modelos/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ServicioTSService {

  constructor(private http:HttpClient) { }


  private url = environment.apiUrl;
  
deleteServicioT(id : number, tipo : number = 0)
{
let direccion = this.url + 'api/ServicioT/eliminarCaso?id=' + id +'&tipo=' + tipo;
return this.http.delete<boolean>(direccion);
}

  getCasosST(estado : number){
    let direccion = this.url +'api/ServicioT/listarServicioT/' + '?estado=' + estado;
    return this.http.get<servicioT[]>(direccion);
   }

   getCasosSTR(estado : number)
   {
    let direccion = this.url +'api/ServicioT/listarServicioTR/' + '?estado=' + estado;
    return this.http.get<servicioT[]>(direccion);
   }

    sendCaso(caso : servicioTCrear){
      let direccion = this.url +'api/ServicioT/registrarCaso';
      return this.http.put<respuesta>(direccion, caso);
    }

    updateServicioTecnico(caso : servicioTCrear){
      let direccion = this.url +'api/ServicioT/actualizarCaso';
      return this.http.patch<respuesta>(direccion, caso);
    }

    
}
