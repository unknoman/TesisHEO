import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticascom',
  templateUrl: './estadisticascom.component.html',
  styleUrls: ['./estadisticascom.component.css']
})
export class EstadisticascomComponent {

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
