import { Component } from '@angular/core';
import { TablasComponent } from 'src/app/componentes/utilidades/tablas/tablas.component';
import { clientes } from 'src/app/modelos/clientes';
import { decodedToken } from 'src/app/modelos/decodedToken';
import { ListarClientesService } from 'src/app/servicios/recepcion/listar-clientes.service';
import { JwtserviceService } from 'src/app/servicios/utilidades/jwtservice.service';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent {


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


  ngOnInit(): void {
  }


constructor(private jwtutilidades:JwtserviceService)
{

}

}
