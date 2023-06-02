import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { planes } from 'src/app/modelos/planes';
import { tecnico } from 'src/app/modelos/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicosService {

  constructor(private http:HttpClient) { }


  private url = environment.apiUrl;
  
  getTecnicosAll(buscarPor : number = 0, buscarBarra : string = ""):Observable<tecnico[]>{
    let direccion = this.url +'tecnico/listarTecnico';
    if(buscarBarra != ""){
      direccion += `?numero=${buscarPor}&nombre=${buscarBarra}`;
    } else
    {
      direccion += `?numero=${buscarPor}`;
    }
    console.log(direccion)
    return this.http.get<tecnico[]>(direccion);
   }


   registrarTecnico(tecnico:tecnico){
    let direccion = this.url +'tecnico/crearTecnico';
    return this.http.put(direccion, tecnico)
   }


   borrarTecnico(id:number){
    let direccion = this.url +'tecnico/eliminarTecnico';
    direccion += `?id=${id}`;
    return this.http.delete(direccion);
   }
}
