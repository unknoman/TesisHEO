import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login/login.service';

@Component({
  selector: 'app-dashboard-r',
  templateUrl: './dashboard-r.component.html',
  styleUrls: ['./dashboard-r.component.css']
})
export class DashboardRComponent {

  constructor(private  loginService: LoginService, private router: Router)
  {

  }
  

  cerrarSesion()
  {
    this.loginService.cerrarSesion();
  }


}
