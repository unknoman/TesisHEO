import { Component, Inject } from '@angular/core';
import { usuario } from 'src/app/modelos/usuario';
import { Router } from '@angular/router';
import { SweetalertutilService } from 'src/app/utilidades/sweetalertutil.service';
import { environment } from 'src/app/enviorment';
import { LoginService } from 'src/app/servicios/login/login.service';
import { JwtserviceService } from 'src/app/servicios/utilidades/jwtservice.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private alerta:SweetalertutilService, private login:LoginService, private jwtutilidades: JwtserviceService)
  {

  }

  
  usuario = new usuario();
 ingresar(usuario: usuario)
  {
    
    this.login.ingresar(usuario).subscribe(data => {
    console.log(data);
     localStorage.setItem('key', data.tokenJWT);
     });

/*  const tokenxd;
     localStorage.getItem('token') 
     var token = this.jwtutilidades.decodificartoken(localStorage.getItem('token'))*/
    

    if (usuario.usuario1 == 'emanuel@', usuario.password == 'emanuel12' ){
        this.router.navigate(['/']);
        this.alerta.correcto('Te logeaste correctamente');
        this.router.navigate(['/dashboardar'])
    } else {
      this.alerta.errorm('Usuario o contraseña incorrectos');
    } 
    console.log(localStorage.getItem('key'));
  } 

}
