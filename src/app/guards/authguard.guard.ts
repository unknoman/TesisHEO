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
   rutas = ['dashboardcr', 'otra-ruta', 'otra-ruta-mas'];
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const eltoken = localStorage.getItem('key');
    console.log(eltoken); // Agregar esta línea
    if (eltoken) {
      const decodedTokenx: decodedToken = this.tokenservice.decodificartoken(eltoken);
      if (decodedTokenx.idRol == '1' && state.url.indexOf('dashboardar') !== -1) {
        return true;
      } else if (decodedTokenx.idRol == '2' && state.url.indexOf('dashboardcr') !== -1) {
        return true;
      } else if (decodedTokenx.idRol == '3' && state.url.indexOf('dashboardrr')!== -1) {
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
