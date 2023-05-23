import { Component } from '@angular/core';
import { planes } from 'src/app/modelos/planes';
import { PlanesService } from 'src/app/servicios/cobranza/planes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent {

  public  planesList:Array<planes> = [];

  ngOnInit(): void {
    this.getPlanesAll();
  }


  constructor(private planesService:PlanesService){
  }

  getPlanesAll()
  {
     this.planesService.getPlanesAll().subscribe(planes => {
      this.planesList = planes;
     })
  }

}
