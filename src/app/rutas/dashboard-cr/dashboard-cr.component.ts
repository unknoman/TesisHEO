import { Component } from '@angular/core';
import { clientes } from 'src/app/modelos/clientes';
import { ListarClientesService } from 'src/app/servicios/recepcion/listar-clientes.service';

@Component({
  selector: 'app-dashboard-cr',
  templateUrl: './dashboard-cr.component.html',
  styleUrls: ['./dashboard-cr.component.css']
})
export class DashboardCRComponent {

  public clientesList:Array<any> = [{nombre: 'Clientes'}, {nombre: 'Clientes2'}];
  public clientex:Array<any> = [{Clientes: 'Cliente 1', Clientes2: 'Cliente 2'}, {Clientes2: 'Cliente 2'}];

  ngOnInit(): void {
    //this.getUserAll();
  }

  /*public getUserAll() // get user
  {
    this.servClientes.getUserAll().subscribe(respuesta => {
      this.clientesList = respuesta;
      console.log(respuesta);
    });
  } */

  constructor(private servClientes:ListarClientesService)
  {

  }
}
