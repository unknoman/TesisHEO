import { Component, Inject } from '@angular/core';
import { usuario } from 'src/app/modelos/usuario';
import { Router } from '@angular/router';
import { SweetalertutilService } from 'src/app/utilidades/sweetalertutil.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private alerta:SweetalertutilService)
  {

  }

  
  usuario = new usuario();
  
 ingresar(usuario: usuario)
  {
    if (usuario.usuario1 == 'emanuel@', usuario.password == 'emanuel12' ){
        this.router.navigate(['/']);
        this.alerta.correcto('Te logeaste correctamente');
        this.router.navigate(['/dashboard'])
    } else {
      this.alerta.errorm('Usuario o contraseña incorrectos');
    }
  }


}
