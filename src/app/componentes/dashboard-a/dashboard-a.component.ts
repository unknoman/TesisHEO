import { Component } from '@angular/core';
import { LoginService } from 'src/app/servicios/login/login.service';
@Component({
  selector: 'app-dashboard-a',
  templateUrl: './dashboard-a.component.html',
  styleUrls: ['./dashboard-a.component.css']
})
export class DashboardAComponent {
constructor(private login:LoginService)
{
}
cerrarSesion()
{
  this.login.cerrarSesion();
}

}
