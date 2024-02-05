import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { estadisticasDTO } from '../modelos/estadisticas';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasserviceService {

  constructor(private http:HttpClient) { }

  private url = environment.apiUrl;

  getPlanesMayorAdquirido(Desde:string, Hasta:string):Observable<estadisticasDTO[]>{
    let direccion = this.url +'estadisticas/obtenerDatosPlanes?fechaDesde=' + Desde + "&fechaHasta="+ Hasta;
    return this.http.get<estadisticasDTO[]>(direccion);
   }

   getTecnicosCasos(Desde:string, Hasta:string):Observable<estadisticasDTO[]>{
    let direccion = this.url +'estadisticas/obtenerdatosTecnicos?fechaDesde=' + Desde + "&fechaHasta="+ Hasta;
    return this.http.get<estadisticasDTO[]>(direccion);
   }


   getEstadoEstadistica(Desde:string, Hasta:string):Observable<estadisticasDTO[]>{
    let direccion = this.url +'estadisticas/obtenerEstadisticaDatos?fechaDesde=' + Desde + "&fechaHasta="+ Hasta;
    return this.http.get<estadisticasDTO[]>(direccion);
   }

   getTecnicosCasosR(Desde:string, Hasta:string):Observable<estadisticasDTO[]>{
    let direccion = this.url +'estadisticas/obtenerdatosTecnicosR?fechaDesde=' + Desde + "&fechaHasta="+ Hasta;
    return this.http.get<estadisticasDTO[]>(direccion);
   }

}
