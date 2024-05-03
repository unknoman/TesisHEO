import { Component } from '@angular/core';
import { JwtDecodeOptions } from 'jwt-decode';
import { TecnicoscComponent } from 'src/app/componentes/cobranza/tecnicosc/tecnicosc.component';
import { decodedToken } from 'src/app/modelos/decodedToken';
import { tokenJWT } from 'src/app/modelos/tokenJWT';
import { JwtserviceService } from 'src/app/servicios/utilidades/jwtservice.service';
@Component({
  selector: 'app-tecnicosr',
  templateUrl: './tecnicosr.component.html',
  styleUrls: ['./tecnicosr.component.css']
})
export class TecnicosrComponent {

constructor(private jwtutilidades:JwtserviceService){

}
  getUser()
  {
    const tokenKey = localStorage.getItem('key');
    if(tokenKey)
    {
      const objetox: decodedToken = this.jwtutilidades.decodificartoken(tokenKey);  
      if(objetox.idRol == '2')
      return 2
      else if (objetox.idRol == '3')
      return 3 
      else
      return 1
    }
    return 1
  }



}
