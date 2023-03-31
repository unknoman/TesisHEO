import { Component } from '@angular/core';
import { LoginService } from 'src/app/servicios/login/login.service';

@Component({
  selector: 'app-dashboard-c',
  templateUrl: './dashboard-c.component.html',
  styleUrls: ['./dashboard-c.component.css']
})
export class DashboardCComponent {

  constructor(private  loginService: LoginService)
  {

  }

  cerrarSesion()
  {
    this.loginService.cerrarSesion();
  }
}
