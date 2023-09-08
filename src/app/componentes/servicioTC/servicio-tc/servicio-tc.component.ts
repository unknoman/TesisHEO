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

 public tecnicoList:Array<tecnico> = [];
 public socios:Array<clientes> = [];

constructor(private notificaciones:SweetalertutilService, private clientes:ListarClientesService,private tecnicos:TecnicosService, private servicioTS :ServicioTSService, private jwtutilidades:JwtserviceService, private modalServices: BsModalService){

}
ngOnInit(): void {
  this.getServicioT();
  this.getTecnico();
  this.getClientes();
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

getServicioT(){
this.servicioTS.getCasosST().subscribe(casosGet => {
  this.casos = casosGet;
} )
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
  this.tecnicos.getTecnicosAll().subscribe(tecnicosGeted =>{
    this.tecnicoList = tecnicosGeted;
  })
}

getClientes(){
this.clientes.getUserAll().subscribe(clientes => {
this.socios = clientes;
})
}

updatearCaso(caso : servicioT){
this.CasosServicio.idcaso = caso.idproblemat;
this.CasosServicio.descripcionserviciot = caso.descripcionserviciot;
this.CasosServicio.idestadoservicio = caso.idestadoservicio;
this.CasosServicio.idtecnico = caso.idtecnico; 
this.modalRef = this.modalServices.show(this.modalUpdatex);
}





submitUpdate(){
  this.servicioTS.updateServicioTecnico(this.CasosServicio).subscribe(respuestax => {
    if(respuestax.estadoRespuesta == true)
      this.notificaciones.correcto(respuestax.mensajeRespuesta);
     else
    this.notificaciones.errorm(respuestax.mensajeRespuesta);
  });
}


submitForm() {
  
  this.servicioTS.sendCaso(this.CasosServicio).subscribe(respuesta1 => {
    if(respuesta1.estadoRespuesta == true){
      this.notificaciones.correcto(respuesta1.mensajeRespuesta);
      this.getServicioT();
      this.modalRef.hide();
    } else {
      this.notificaciones.errorm(respuesta1.mensajeRespuesta);
    }
  })
    
}


}



