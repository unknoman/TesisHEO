import { DecimalPipe } from "@angular/common";

export class pagos{
    idfactura:number = 0;
    fecha:Date =  new Date(0, 0, 0, 0, 0, 0);
    fechavencimiento:Date = new Date(0, 0, 0, 0, 0, 0);
    fechapagado:Date = new Date(0, 0, 0, 0, 0, 0);
    servicio:string = '';
    preciototal:number = 0;
    idestadop:number = 0;
    estado:string = '';
    constructor(){

        }
}
