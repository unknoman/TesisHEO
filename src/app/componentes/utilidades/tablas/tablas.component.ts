import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css'],
})


export class TablasComponent {
  @Input() columnas: any[] = [];
  @Input() datos: any[] = [];
}
