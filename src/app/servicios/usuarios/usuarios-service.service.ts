import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { respuesta } from 'src/app/modelos/respuesta';
import { usuarioActualizar } from 'src/app/modelos/usuarioActualizar';
import { usuarioCrear } from 'src/app/modelos/usuarioCrear';
import { usuarioO } from 'src/app/modelos/usuarioO';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  private url = environment.apiUrl;
  constructor(private http:HttpClient) {
   }


   getUser():Observable<usuarioO[]>{
    let direccion = this.url +'api/Usuario/listarUsuario';
    return this.http.get<usuarioO[]>(direccion);
   }


   eliminarUsuario(id :number):Observable<respuesta[]>{
    let direccion = this.url +'api/Usuario/eliminarUsuario' + {id};
    return this.http.delete<respuesta[]>(direccion);
   }

   crearUsuario(usuario:usuarioCrear):Observable<respuesta[]>{
    let direccion = this.url +'api/Usuario/registrarUsuario';
    return this.http.put<respuesta[]>(direccion, usuario);
   }

   actualizarUsuario(usuario:usuarioActualizar):Observable<respuesta[]>{
    let direccion = this.url +'api/Usuario/actualizarUsuario';
    return this.http.patch<respuesta[]>(direccion, usuario);
   }

}
