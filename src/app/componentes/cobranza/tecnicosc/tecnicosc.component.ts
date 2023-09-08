import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { tecnico } from 'src/app/modelos/tecnico';
import { TecnicosService } from 'src/app/servicios/cobranza/tecnicos.service';
import { SweetalertutilService } from 'src/app/utilidades/sweetalertutil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tecnicosc',
  templateUrl: './tecnicosc.component.html',
  styleUrls: ['./tecnicosc.component.css']
})
export class TecnicoscComponent {
  modalRef!: BsModalRef; // Declaración de la propiedad modalRef
  @ViewChild('registrarTecnico') modalTecnico: any;

  buscarPor : number = 0;
  buscarBarra : string = "";
  tecnicoNuevo = new tecnico();
  public tecnicosList:Array<tecnico> = [];

  
  constructor(private tecnicos:TecnicosService, private modalServices: BsModalService, private notificacion:SweetalertutilService){
 this.buscarMetodo(this.buscarPor, this.buscarBarra);
  }

  buscarBoton(){
    this.buscarMetodo(this.buscarPor, this.buscarBarra);
  }

  nuevoTecnico(){
   this.modalServices.show(this.modalTecnico);
  }

crearTecnico(tecnico:tecnico){
  this.tecnicos.registrarTecnico(tecnico).subscribe(info => {
    if(info == true){
      this.notificacion.correcto("El tecnico fue creado correctamente")
      this.buscarMetodo(this.buscarPor, this.buscarBarra);
    } else
    {
      this.notificacion.errorm("Hubo un error y no se pudo crear el tecnico");
    }
  })
}
  submitForm(){
    if (
      this.tecnicoNuevo.nombret.trim() === '' ||
      this.tecnicoNuevo.apellidot.trim() === '' ||
      this.tecnicoNuevo.telefonot.trim() === '' 
    ) {
      this.notificacion.errorm('Verifique los campos')
    } else {
    this.crearTecnico(this.tecnicoNuevo);
    }
    this.modalRef.hide();
  }

  buscarMetodo(buscarpor:number, buscarbar:string){
      this.tecnicos.getTecnicosAll(buscarpor, buscarbar).subscribe(info => {
        this.tecnicosList = info;
      })
  }

  borrarTecnico(tecnico:tecnico){
    Swal.fire({
      title: 'Eliminar Tecnico',
      text: '¿Deseas borrar el Tecnico ' + tecnico.nombret + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.tecnicos.borrarTecnico(tecnico.idtecnico).subscribe(info =>{
          if(info == true){
           this.notificacion.correcto("El tecnico " + tecnico.nombret + " se borró correctamente");
           this.buscarMetodo(this.buscarPor, this.buscarBarra);
          } else {
           this.notificacion.errorm("el socio tiene pagos pendientes por abonar");
          }
       })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
      } 
    });



}
}