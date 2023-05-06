import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css'],
})


export class TablasComponent {
  @Input() columnas: any[] = [];
  @Input() datos: any[] = [];
  @Input() botones: any[] = [];
  @Output() botonClickeado = new EventEmitter<any>();
  


  onBotonClickeado(boton: any) {
    this.botonClickeado.emit(boton);
  }

  

}
