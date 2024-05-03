import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { decodedToken } from 'src/app/modelos/decodedToken';
import { planillaST } from 'src/app/modelos/planillaST';
import { servicioT } from 'src/app/modelos/servicioT';
import { tecnico } from 'src/app/modelos/tecnico';
import { tecnicoUpdateDTO } from 'src/app/modelos/tecnicoUpdateDTO';
import { TecnicosService } from 'src/app/servicios/cobranza/tecnicos.service';
import { ServicioTSService } from 'src/app/servicios/servicioTS/servicio-ts.service';
import { JwtserviceService } from 'src/app/servicios/utilidades/jwtservice.service';
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
  @ViewChild('modificarTecnico') modalTecnicoUpdate : any;
  paginaActual: number = 1;
  buscarPor : number = 0;
  buscarBarra : string = "";
  tecnicoNuevo = new tecnico();
  tecnicoDTO = new tecnicoUpdateDTO();
  public tecnicosList:Array<tecnico> = [];


  // form tecnico
  formTecnico = new FormGroup({
    'fnombre': new FormControl('', [Validators.minLength(3), Validators.required]),
    'fapellido': new FormControl('', [Validators.minLength(3), Validators.required]),
    'ftelefono' : new FormControl('', [Validators.pattern(/^[0-9]+$/), Validators.minLength(3), Validators.required,
    ]),
  })
  
  constructor(private tecnicos:TecnicosService, private modalServices: BsModalService, private notificacion:SweetalertutilService, private serviciot : ServicioTSService, private jwtutilidades:JwtserviceService){
 this.buscarMetodo(this.buscarPor, this.buscarBarra);
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


  buscarBoton(){
    this.buscarMetodo(this.buscarPor, this.buscarBarra);
  }

  nuevoTecnico(){
    this.modalRef = this.modalServices.show(this.modalTecnico);
  }


  modificarTecnicoModal(tecnico : tecnico){
    this.tecnicoDTO.id = tecnico.idtecnico;
    this.tecnicoDTO.nombret = tecnico.nombret;
    this.tecnicoDTO.apellidot = tecnico.apellidot;
    this.tecnicoDTO.telefonot = tecnico.telefonot;
    this.modalRef = this.modalServices.show(this.modalTecnicoUpdate);
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

modificarTecnico(Tecnico : tecnico)
{
  if(Tecnico.nombret == null || Tecnico.apellidot  == null|| Tecnico.telefonot == null)
  {
    this.notificacion.errorm("Verifica todos los campos");
  } else 
  {
    this.tecnicos.modificarTecnico(this.tecnicoDTO).subscribe(info => {
      if(info == true)
      {
        this.notificacion.correcto("El tecnico se modificó correctamente");
        this.buscarMetodo(this.buscarPor, this.buscarBarra);
        this.modalRef.hide();
      } else
      {
        this.notificacion.errorm("Hubo un error, verifica todos los campos");
      }
    });
  }
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

  submitFormUpdate(){
      this.modificarTecnico(this.tecnicoNuevo);
  }
  
  buscarMetodo(buscarpor:number, buscarbar:string){
      this.tecnicos.getTecnicosAll(buscarpor, buscarbar).subscribe(info => {
        this.tecnicosList = info;
      })
  }

  borrarTecnico(tecnico:tecnico){
    Swal.fire({
      title: 'Eliminar Técnico',
      text: '¿Deseas borrar el Técnico ' + tecnico.nombret + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.tecnicos.borrarTecnico(tecnico.idtecnico).subscribe(info =>{
          if(info == true){
           this.notificacion.correcto("El técnico " + tecnico.nombret + " se borró correctamente");
           this.buscarMetodo(this.buscarPor, this.buscarBarra);
          } else {
           this.notificacion.errorm("El técnico tiene casos asignados en estado pendiente");
          }
       })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
      } 
    });



}

planillaST?: planillaST[];

@ViewChild('planillaDescargar', { static: false }) planillaDescargar!: ElementRef;

setearPlanilla(id:number, tipo : number): Promise<void> {
  return new Promise<void>((resolve) => {
    this.serviciot.getPlanillaST(id, tipo).subscribe(info => {
      this.planillaST = info;
    })
    resolve();  // Resuelve la promesa despu�s de setear la factura
  });
}



async descargarPlanilla(id: number, tipo : number) {
  this.setearPlanilla(id, tipo);
  await new Promise(resolve => setTimeout(resolve, 1000)); 
      const element = this.planillaDescargar.nativeElement;
      console.log(this.planillaST);
     if (this.planillaDescargar) {
        this.planillaDescargar.nativeElement.style.visibility = 'visible';
      } 
      console.log(this.planillaST);
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
       const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('ServicioT.pdf');
        this.planillaDescargar.nativeElement.style.visibility = 'hidden';
     setTimeout(() => {
          URL.revokeObjectURL(imgData);
        }, 3000);
     });
      
  }


}
