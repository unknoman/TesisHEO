import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { decodedToken } from '../modelos/decodedToken';
import { JwtserviceService } from '../servicios/utilidades/jwtservice.service';
import { AuthService } from '@auth0/auth0-angular/public-api';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
   rutasAdmin = ['dashboardar', 'otra-ruta', 'otra-ruta-mas'];
   rutasCobranza = ['dashboardcr', 'sociosr', 'tecnicosr', 'planesr', 'problemastr'];
   rutasRecepcion = ['dashboardrr', 'problemastr', 'sociosr'];
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const eltoken = localStorage.getItem('key');
    console.log(eltoken); 
    if (eltoken) {
      const rutaPermitidaAdmin= this.rutasAdmin.filter(ruta => state.url.includes(ruta)).length > 0;
      const rutaPermitidaCobranza = this.rutasCobranza.filter(ruta => state.url.includes(ruta)).length > 0;
      const rutaPermitidaRecepcion = this.rutasRecepcion.filter(ruta => state.url.includes(ruta)).length > 0;
      const decodedTokenx: decodedToken = this.tokenservice.decodificartoken(eltoken);
      if (decodedTokenx.idRol == '1' && rutaPermitidaAdmin) {
        return true;
      } else if (decodedTokenx.idRol == '2' && rutaPermitidaCobranza) {
        return true;
      } else if (decodedTokenx.idRol == '3' && rutaPermitidaRecepcion) {
        return true;
      } else {
        console.log(decodedTokenx);
        return this.router.navigate(['/loginr']);
        localStorage.clear();
      }
    }
    
    return this.router.createUrlTree(['/loginr']);
  }

  constructor(private tokenservice: JwtserviceService, private router: Router){

  }


}
