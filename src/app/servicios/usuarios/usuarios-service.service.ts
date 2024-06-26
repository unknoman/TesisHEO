import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { Rol } from 'src/app/modelos/Rol';
import { respuesta } from 'src/app/modelos/respuesta';
import { usuarioActualizar } from 'src/app/modelos/usuarioActualizar';
import { usuarioCrear } from 'src/app/modelos/usuarioCrear';
import { usuarioO } from 'src/app/modelos/usuarioO';
import * as crypto from 'crypto-js';

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


   eliminarUsuario(id :number):Observable<respuesta>{
    let direccion = this.url +'api/Usuario/eliminarUsuario';
    direccion += `?id=${id}`;
    return this.http.delete<respuesta>(direccion);
   }
   

   crearUsuario(usuario:usuarioCrear):Observable<respuesta>{
    const hash = crypto.MD5(usuario.password);
    usuario.password = hash.toString();
    let direccion = this.url +'api/Usuario/registrarUsuario';
   return this.http.post<respuesta>(direccion, usuario);
   }

   actualizarUsuario(usuario:usuarioActualizar):Observable<respuesta>{
    let direccion = this.url +'api/Usuario/actualizarUsuario';
    const hash = crypto.MD5(usuario.password);
    usuario.password = hash.toString();
    return this.http.patch<respuesta>(direccion, usuario);
   }

   getRol()
   {
    let direccion = this.url +'api/Usuario/listarRoles';
    return this.http.get<Rol[]>(direccion);
   }

}
