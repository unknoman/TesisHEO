import { Component, ViewChild } from '@angular/core';
import { estadisticasDTO } from 'src/app/modelos/estadisticas';
import { EstadisticasserviceService } from 'src/app/servicios/estadisticasservice.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { NgxChartsModule } from '@javierbaromorales/ngx-charts-v2';
import { decodedToken } from 'src/app/modelos/decodedToken';
import { JwtserviceService } from 'src/app/servicios/utilidades/jwtservice.service';


@Component({
  selector: 'app-estadisticascom',
  templateUrl: './estadisticascom.component.html',
  styleUrls: ['./estadisticascom.component.css']
})
export class EstadisticascomComponent {

 public StatsRadio : number = 1;
  public estadisticaList:Array<estadisticasDTO> = [];
  public fechaDesde: Date = new Date();
  public fechaHasta: Date = new Date();
  public fechaDesdeF : string ="00/00/0000";
  public fechaHastaF : string ="00/00/0000";
  showChart = true;
  showChartT = true;
  ShowDatePicker = false;
yAxisLimits: any;
  constructor(private estadisticas : EstadisticasserviceService, private jwtutilidades:JwtserviceService){
      this.getPlanesMayorAdquirido(this.fechaDesdeF, this.fechaHastaF);
      this.getTecnicosEstadistica(this.fechaDesdeF, this.fechaHastaF);
  }


  formatYAxisTick(value: number): string {
    // Redondear el valor al entero más cercano
    const roundedValue = Math.ceil(value);
    // Convertir el valor a cadena y devolverlo
    return roundedValue.toString();
  }

  yAxisFormat(val : any) {
    if (val % 1 > 0) return "";
    return val ;
 }

  getPlanesMayorAdquirido(fechaDesde : string, fechaHasta : string){
    this.estadisticaList = [];
    this.estadisticas.getPlanesMayorAdquirido(fechaDesde, fechaHasta).subscribe(info => {
      this.estadisticaList = info;
    })
  }


  getTecnicosEstadistica(fechaDesde : string, fechaHasta : string){
    this.estadisticaList = [];
    this.estadisticas.getTecnicosCasos(fechaDesde, fechaHasta).subscribe(info => {
      this.estadisticaList = info;
    })
  }

  
  getEstadosEstadistica(fechaDesde : string, fechaHasta : string){
    this.estadisticaList = [];
    this.estadisticas.getEstadoEstadistica(fechaDesde, fechaHasta).subscribe(info => {
      this.estadisticaList = info;
    })
  }


  getTecnicosEstadisticaR(fechaDesde : string, fechaHasta : string){
    this.estadisticaList = [];
    this.estadisticas.getTecnicosCasosR(fechaDesde, fechaHasta).subscribe(info => {
      this.estadisticaList = info;
    })
  }

   aplicar(){
    this.fechaDesdeF = moment(this.fechaDesde).format('MM/DD/yyyy');
    this.fechaHastaF = moment(this.fechaHasta).format('MM/DD/yyyy');
    
    this.getPlanesMayorAdquirido(this.fechaDesdeF, this.fechaHastaF); 
    this.showChart = false;
   // this.getTecnicosEstadistica(this.fechaDesdeF, this.fechaHastaF);
    // this.showChartT = false;
    // Mostrar el gráfico después de un pequeño retraso (puedes ajustar según sea necesario)
    setTimeout(() => {
      this.showChart = true;
    }, 100);
    console.log(this.estadisticaList);
   }

 limpiarArray()
 {
 this.estadisticaList = [];
 }
   aplicarET(){
    this.fechaDesdeF = moment(this.fechaDesde).format('MM/DD/yyyy');
    this.fechaHastaF = moment(this.fechaHasta).format('MM/DD/yyyy');
    
   // this.getPlanesMayorAdquirido(this.fechaDesdeF, this.fechaHastaF); 
    //this.showChart = false;

      this.getTecnicosEstadistica(this.fechaDesdeF, this.fechaHastaF);
    this.showChartT = false;
    // Mostrar el gráfico después de un pequeño retraso (puedes ajustar según sea necesario)
    setTimeout(() => {
      this.showChartT = true;
    }, 100);
    console.log(this.estadisticaList);
   }



   aplicarETR(){
    this.fechaDesdeF = moment(this.fechaDesde).format('MM/DD/yyyy');
    this.fechaHastaF = moment(this.fechaHasta).format('MM/DD/yyyy');
    
   // this.getPlanesMayorAdquirido(this.fechaDesdeF, this.fechaHastaF); 
    //this.showChart = false;

      this.getTecnicosEstadisticaR(this.fechaDesdeF, this.fechaHastaF);
    this.showChartT = false;
    // Mostrar el gráfico después de un pequeño retraso (puedes ajustar según sea necesario)
    setTimeout(() => {
      this.showChartT = true;
    }, 100);
    console.log(this.estadisticaList);
   }



   aplicarESE(){
    this.fechaDesdeF = moment(this.fechaDesde).format('MM/DD/yyyy');
    this.fechaHastaF = moment(this.fechaHasta).format('MM/DD/yyyy');
    
   // this.getPlanesMayorAdquirido(this.fechaDesdeF, this.fechaHastaF); 
    //this.showChart = false;
    this.getEstadosEstadistica(this.fechaDesdeF, this.fechaHastaF);
    this.showChartT = false;
    // Mostrar el gráfico después de un pequeño retraso (puedes ajustar según sea necesario)
    setTimeout(() => {
      this.showChartT = true;
    }, 100);
    console.log(this.estadisticaList);
   }


   getUser()
   {
     const tokenKey = localStorage.getItem('key');
     if(tokenKey)
     {
       const objetox: decodedToken = this.jwtutilidades.decodificartoken(tokenKey);  
       if(objetox.idRol == '2')
       return 2
       else if (objetox.idRol == '3')
       return 3 
       else
       return 1
     }
     return 1
   }






}
