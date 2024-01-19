import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { clientes } from 'src/app/modelos/clientes';
import { decodedToken } from 'src/app/modelos/decodedToken';
import { servicioT } from 'src/app/modelos/servicioT';
import { servicioTCrear } from 'src/app/modelos/servicioTCrear';
import { tecnico } from 'src/app/modelos/tecnico';
import { tokenJWT } from 'src/app/modelos/tokenJWT';
import { TecnicosService } from 'src/app/servicios/cobranza/tecnicos.service';
import { ListarClientesService } from 'src/app/servicios/recepcion/listar-clientes.service';
import { ServicioTSService } from 'src/app/servicios/servicioTS/servicio-ts.service';
import { JwtserviceService } from 'src/app/servicios/utilidades/jwtservice.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SweetalertutilService } from 'src/app/utilidades/sweetalertutil.service';
import { respuesta } from 'src/app/modelos/respuesta';
import { waitForAsync } from '@angular/core/testing';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';
import { usuarioO } from 'src/app/modelos/usuarioO';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-servicio-tc',
  templateUrl: './servicio-tc.component.html',
  styleUrls: ['./servicio-tc.component.css']
})
export class ServicioTCComponent {
  public casos:Array<servicioT> = [];
  @ViewChild('registrarServicioT') modal: any;
  @ViewChild('actualizarServicioT') modalUpdatex: any;
  modalRef!: BsModalRef; // Declaración de la propiedad modalRef

  public CasosServicio: servicioTCrear = new servicioTCrear();
  casosActualizarx: servicioT = new servicioT();
public paginaActual:number = 1;
 public tecnicoList:Array<tecnico> = [];
 public socios:Array<clientes> = [];
 public sociosInstalados:Array<clientes> = [];
 public sociosNoInstalados:Array<clientes> = [];
public estadoST : number = 1;


//--------------
servicioTF = new FormGroup({
  'fdescripcion': new FormControl(this.CasosServicio.descripcionserviciot, [Validators.minLength(3), Validators.required]),
  'fcliente': new FormControl('', [Validators.min(1)]),
  'ftipo': new FormControl('', [Validators.min(1)]),
  'festado': new FormControl('', [Validators.min(1)]),
})



//----------
constructor(private notificaciones:SweetalertutilService, private clientes:ListarClientesService,private tecnicos:TecnicosService, private servicioTS :ServicioTSService, private jwtutilidades:JwtserviceService, private modalServices: BsModalService){

}
ngOnInit(): void {
  this.updatearTodo();
  if(this.getUser() == 3)
  {
    this.CasosServicio.idtiposerviciot = 1;
    this.CasosServicio.fechainicio = new Date();
  } else if(this.getUser() == 2)
  {
    this.CasosServicio.idtiposerviciot = 2;
    this.CasosServicio.fechainicio = new Date();
  }

  
}

updatearTodo(){
  this.getServicioT(this.estadoST);
  this.getTecnico();
  this.getClientes();
  this.getClientesInstalado();
  this.getClientesNoInstalado();
}

clearModel(){
this.CasosServicio.descripcionserviciot = '';
this.CasosServicio.idtecnico = 0;
this.CasosServicio.idcliente = 0;
this.CasosServicio.idestadoservicio = 0;
}


getServicioT(estado : number){
  if(this.getUser() == 2)
  {
    this.servicioTS.getCasosST(estado).subscribe(casosGet => {
      this.casos = casosGet;
    } )
  } else 
  {
    this.servicioTS.getCasosSTR(estado).subscribe(casosGet => {
      this.casos = casosGet;
    } )
  }
}

eliminarCaso(caso :servicioT, tipo : number){
  Swal.fire({
    title: 'Eliminar Servicio Tecnico',
    text: '¿Deseas borrar el caso ' + caso.descripcionserviciot + '?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'Cancelar'
    
  }).then((result) => {
    if (result.isConfirmed) {
         this.servicioTS.deleteServicioT(caso.idproblemat, tipo).subscribe(mensaje => {
        if(mensaje == true)
        {
          this.notificaciones.correcto("Se elimino correctamente el caso");
          this.updatearTodo();
        } else 
        {
          this.notificaciones.errorm("El caso no existe, recarga la pagina!");
        }
      })
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.close();
    } 
  });
}

buscarBoton(){
this.getServicioT(this.estadoST);
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


crearCasoModal()
{
  this.modalRef = this.modalServices.show(this.modal);
  
}

getTecnico(){
  this.tecnicos.getTecnicosDisponibles().subscribe(tecnicosGeted =>{
    this.tecnicoList = tecnicosGeted;
  })
}

getClientes(){
this.clientes.getUserAll().subscribe(clientes => {
this.socios = clientes;
})
}

getClientesInstalado(){
  this.clientes.getUserAllSimple(1).subscribe(socios => {
    this.sociosInstalados = socios;
  } )
}

getClientesNoInstalado(){
  this.clientes.getUserAllSimple(0).subscribe(socios => {
    this.sociosNoInstalados = socios;
  } )
}

updatearCaso(caso: servicioT) {
  
  this.CasosServicio.idcaso = caso.idproblemat;
  this.CasosServicio.descripcionserviciot = caso.descripcionserviciot;
  this.CasosServicio.idestadoservicio = caso.idestadoservicio;
  this.CasosServicio.idcliente = caso.idcliente;
  this.CasosServicio.idtecnico = caso.idtecnico;

  this.modalRef = this.modalServices.show(this.modalUpdatex);
}





submitUpdate(){
  this.servicioTS.updateServicioTecnico(this.CasosServicio).subscribe(respuestax => {
    if(respuestax.estadoRespuesta == true)
    {
      this.notificaciones.correcto(respuestax.mensajeRespuesta);
      this.updatearTodo();
    }
     else
     {
    this.notificaciones.errorm(respuestax.mensajeRespuesta);
     }
  }); 
  this.servicioTS.updateServicioTecnico(this.CasosServicio)
  this.modalRef.hide();
}


submitForm() {
  console.log(this.CasosServicio);
  this.servicioTS.sendCaso(this.CasosServicio).subscribe(respuesta1 => {
    if(respuesta1.estadoRespuesta == true){
      this.notificaciones.correcto(respuesta1.mensajeRespuesta);
      this.getServicioT(this.estadoST);
      this.updatearTodo();
      this.modalRef.hide();
      this.clearModel();
    } else {
      this.notificaciones.errorm(respuesta1.mensajeRespuesta);
    }
  })
    
}


}



