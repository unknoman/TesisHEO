import { Component } from '@angular/core';
import { clientes } from 'src/app/modelos/clientes';
import { ListarClientesService } from 'src/app/servicios/recepcion/listar-clientes.service';

@Component({
  selector: 'app-socios-tabla',
  templateUrl: './socios-tabla.component.html',
  styleUrls: ['./socios-tabla.component.css']
})
export class SociosTablaComponent {

  public sociosList:Array<clientes> = [];

  // get estado
  getEstadoClass(idEstado: number) {
    if (idEstado === 1) {
      return 'fila-activo'; // clase CSS para filas activas
    } else if (idEstado === 2) {
      return 'fila-suspendido'; // clase CSS para filas suspendidas
    } else {
      return ''; // si no se cumple ninguna condición, no se aplica ninguna clase
    }
  }
  
  ngOnInit(): void {
    this.getUserAll();
  }


  constructor(private recService:ListarClientesService)
  {

  }

  getUserAll()
  {
      this.recService.getUserAll().subscribe (cliente => {
        this.sociosList = cliente;
      });
  }
}


