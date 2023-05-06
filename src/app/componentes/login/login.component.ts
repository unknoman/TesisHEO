import { Component, Inject } from '@angular/core';
import { usuario } from 'src/app/modelos/usuario';
import { Router } from '@angular/router';
import { SweetalertutilService } from 'src/app/utilidades/sweetalertutil.service';
import { environment } from 'src/app/environment';
import { LoginService } from 'src/app/servicios/login/login.service';
import { JwtserviceService } from 'src/app/servicios/utilidades/jwtservice.service';
import { Token } from '@angular/compiler';
import { decodedToken } from 'src/app/modelos/decodedToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private alerta: SweetalertutilService, private login: LoginService, private jwtutilidades: JwtserviceService) {

  }


  usuario = new usuario();
  ingresar(usuario: usuario) {
    this.login.ingresar(usuario).subscribe(data => {
      if (typeof data == 'object') {
        localStorage.setItem('key', data.tokenJWT);
        const tokenKey = localStorage.getItem('key');
        console.log(tokenKey);
        if (tokenKey) {
          const objetox: decodedToken = this.jwtutilidades.decodificartoken(tokenKey);
          if (objetox.idRol == '1') {
            this.router.navigate(['dashboardar']);
            this.alerta.correcto('Te logeaste como Administrador');
          }
          if (objetox.idRol == '2') {
            this.router.navigate(['dashboardcr']);
            this.alerta.correcto('Te logeaste como area de Cobranza');
          }
          if (objetox.idRol == '3') {
            this.router.navigate(['dashboardrr']);
            this.alerta.correcto('Te logeaste como Recepcion');
          }
        } else {
          this.alerta.errorm('Hay un problema con el servidor');
        }
      } else {
        this.alerta.errorm('Password Incorrecta');
      }
    });
  }



  }

