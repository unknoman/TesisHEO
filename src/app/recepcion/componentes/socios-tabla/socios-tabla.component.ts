import { Component, ViewChild } from '@angular/core';
import { clientes } from 'src/app/modelos/clientes';
import { decodedToken } from 'src/app/modelos/decodedToken';
import { ListarClientesService } from 'src/app/servicios/recepcion/listar-clientes.service';
import { JwtserviceService } from 'src/app/servicios/utilidades/jwtservice.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { pagos } from 'src/app/modelos/pagos';
import { ModalOptions } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { SweetalertutilService } from 'src/app/utilidades/sweetalertutil.service';
import { PlanesService } from 'src/app/servicios/cobranza/planes.service';
import { planes } from 'src/app/modelos/planes';

@Component({
  selector: 'app-socios-tabla',
  templateUrl: './socios-tabla.component.html',
  styleUrls: ['./socios-tabla.component.css']
})
export class SociosTablaComponent {

  public sociosList:Array<clientes> = [];
  public pagosList:Array<pagos> = [];
  public  planesList2:Array<planes> = [];
  socio: clientes = new clientes();
  plan: planes = new planes();
  buscarPor : number = 0;
  buscarPor2 : number = 0;
  buscarBarra : string = "";
  modalRef!: BsModalRef; // Declaración de la propiedad modalRef
  @ViewChild('registrarSocio') modal: any;
  
  // get estado
  getEstadoClass(idEstado: number) {
    if (idEstado === 1) {
      return 'fila-activo'; // clase CSS para filas activas
    } else if (idEstado === 2) {
      return 'fila-suspendido'; // clase CSS para filas suspendidas
    } else {
      return ''; // si no se cumple ninguna condición, no se aplica ninguna clase
    }
  }
  
  ngOnInit(): void {
    this.getUserAll(this.buscarPor, this.buscarPor2, this.buscarBarra);
    this.getPlanesAll();
  }

  

  constructor(private modalServices: BsModalService, private recService:ListarClientesService, private jwtutilidades: JwtserviceService, private modalService: BsModalService, private notificacion:SweetalertutilService, private planesService:PlanesService)
  {

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
  
  buscarMetodo(){
    if(this.buscarPor == 0)
    {
      this.buscarBarra = "";
      this.getUserAll(this.buscarPor, this.buscarPor2, this.buscarBarra);
    } else 
    {
      this.getUserAll(this.buscarPor, this.buscarPor2, this.buscarBarra);
    }
   
  }

  getUserAll(buscarPor : number, buscarPor2: number, buscarBarra : string)
  {
      this.recService.getUserAll(buscarPor, buscarPor2, buscarBarra).subscribe (cliente => {
        this.sociosList = cliente;
      });
  }

  getPagos(id: number, template : any)
  {
      this.recService.getPagos(id).subscribe (pagos => {
        this.pagosList = pagos;
      });

      const config: ModalOptions = {
        class: 'modal-lg' // Tamaño grande (large)
        // Puedes agregar otras opciones de configuración si las necesitas
      };

      this.modalRef = this.modalService.show(template, config);
  }



  borrarSocio(socio:clientes){
    Swal.fire({
      title: 'Eliminar Socio',
      text: '¿Deseas borrar el socio ' + socio.nombre + ' DNI: ' + socio.dnic + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.recService.borrarCliente(socio.idcliente).subscribe(info =>{
          if(info == true){
           this.notificacion.correcto("El socio " + socio.nombre + " se borró correctamente");
           this.getUserAll(this.buscarPor, this.buscarPor2, this.buscarBarra);
          } else {
           this.notificacion.errorm("el socio tiene pagos pendientes por abonar");
          }
       })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
      } 
    });



}


  
getPlanesAll()
{
   this.planesService.getPlanesAll().subscribe(planes => {
    this.planesList2 = planes;
   })
}


submitForm(){

}



crearSocioModal()
{
  this.modalRef = this.modalService.show(this.modal);
}



}
