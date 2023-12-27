import { Component, ViewChild } from '@angular/core';
import { estadisticasDTO } from 'src/app/modelos/estadisticas';
import { EstadisticasserviceService } from 'src/app/servicios/estadisticasservice.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { NgxChartsModule } from '@javierbaromorales/ngx-charts-v2';


@Component({
  selector: 'app-estadisticascom',
  templateUrl: './estadisticascom.component.html',
  styleUrls: ['./estadisticascom.component.css']
})
export class EstadisticascomComponent {

  public estadisticaList:Array<estadisticasDTO> = [];
  public fechaDesde: Date = new Date();
  public fechaHasta: Date = new Date();
  public fechaDesdeF : string ="00/00/0000";
  public fechaHastaF : string ="00/00/0000";
  showChart = true;
  constructor(private estadisticas : EstadisticasserviceService){
      this.getPlanesMayorAdquirido(this.fechaDesdeF, this.fechaHastaF);
  }

  getPlanesMayorAdquirido(fechaDesde : string, fechaHasta : string){
    this.estadisticaList = [];
    this.estadisticas.getPlanesMayorAdquirido(fechaDesde, fechaHasta).subscribe(info => {
      this.estadisticaList = info;
    })
  }

  

   aplicar(){
    this.fechaDesdeF = moment(this.fechaDesde).format('MM/DD/yyyy');
    this.fechaHastaF = moment(this.fechaHasta).format('MM/DD/yyyy');
    
    this.getPlanesMayorAdquirido(this.fechaDesdeF, this.fechaHastaF); 
    this.showChart = false;

    // Mostrar el gráfico después de un pequeño retraso (puedes ajustar según sea necesario)
    setTimeout(() => {
      this.showChart = true;
    }, 100);
    console.log(this.estadisticaList);
   }

  datosBarras = [
    {
      "name": "Categoría 1",
      "value": 120
    },
    {
      "name": "Categoría 2",
      "value": 200
    },
    // ... más datos
  ];


}
