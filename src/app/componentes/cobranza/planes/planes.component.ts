import { HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, catchError, throwError } from 'rxjs';
import { planes } from 'src/app/modelos/planes';
import { PlanesService } from 'src/app/servicios/cobranza/planes.service';
import { JwtserviceService } from 'src/app/servicios/utilidades/jwtservice.service';
import { SweetalertutilService } from 'src/app/utilidades/sweetalertutil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent {

  public  planesList:Array<planes> = [];
  @ViewChild('registrarPlan') modal: any;
  @ViewChild('actualizarPlan') modalPlanUpdate: any;
  modalRef!: BsModalRef;
  
  plan: planes = new planes();

  

  ngOnInit(): void {
    this.getPlanesAll();
  }


  constructor(private planesService:PlanesService, private modalService: BsModalService, private notificacion:SweetalertutilService){
  }

  getPlanesAll()
  {
     this.planesService.getPlanesAll().subscribe(planes => {
      this.planesList = planes;
     })
  }


  nuevoPlan()
  {
    this.modalRef = this.modalService.show(this.modal);
  }




  submitForm() {
    if (
      this.plan.servicio1.trim() === '' ||
      this.plan.bajada.trim() === '' ||
      this.plan.subida.trim() === '' ||
      this.plan.precio <= 0
    ) {
      this.notificacion.errorm('Verifique los campos')
    } else {
      this.planesService.crearPlan(this.plan).subscribe(respuesta => {
        if(respuesta == true)
        {
        this.notificacion.correcto('La operacion fue completada correctamente');
         this.getPlanesAll()
         this.modalRef.hide();
        } else {
          this.notificacion.errorm('Hubo un error');
        }
      })
        
    }
  }

  updatePlan(plan:planes)
  {
    this.plan = plan;
    this.modalRef = this.modalService.show(this.modalPlanUpdate);
  }


  submitFormUpdate() {
    if (
      this.plan.servicio1.trim() === '' ||
      this.plan.bajada.trim() === '' ||
      this.plan.subida.trim() === '' ||
      this.plan.precio <= 0
    ) {
      this.notificacion.errorm('Verifique los campos')
    } else {
      this.planesService.actualizarPlan(this.plan).subscribe(respuesta => {
        if(respuesta == true)
        {
        this.notificacion.correcto('La operacion fue completada correctamente');
         this.getPlanesAll()
         this.modalRef.hide();
        } else {
          this.notificacion.errorm('Hubo un error');
        }
      })
        
    }
  }



  borrarPlan(plan:planes){
    Swal.fire({
      title: 'Borrar plan',
      text: '¿Deseas borrar el plan ' + plan.servicio1 + ' de ' + plan.precio + ' pesos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.planesService.borrarPlan(plan.idservicio).subscribe(info =>{
          if(info == true){
           this.notificacion.correcto("El plan" + plan.servicio1 + "se borró correctamente");
           this.getPlanesAll();
          } else {
           this.notificacion.errorm("Asegurate de que el plan no tenga clientes asignados");
          }
       })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
      }
    });

  }



}