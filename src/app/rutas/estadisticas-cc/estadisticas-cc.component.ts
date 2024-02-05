import { Component } from '@angular/core';
import { decodedToken } from 'src/app/modelos/decodedToken';
import { JwtserviceService } from 'src/app/servicios/utilidades/jwtservice.service';

@Component({
  selector: 'app-estadisticas-cc',
  templateUrl: './estadisticas-cc.component.html',
  styleUrls: ['./estadisticas-cc.component.css']
})
export class EstadisticasCcComponent {

constructor(private jwtutilidades:JwtserviceService)
{

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
