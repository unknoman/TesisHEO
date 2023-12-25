import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
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
import { clientesCrearDTO } from 'src/app/modelos/clienteCrearDTO';
import { estadoPagos } from 'src/app/modelos/estadoPagos';
import { cambiarEstadoP } from 'src/app/modelos/cambiarEstadoP';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-socios-tabla',
  templateUrl: './socios-tabla.component.html',
  styleUrls: ['./socios-tabla.component.css']
})
export class SociosTablaComponent {

  public sociosList:Array<clientes> = [];
  public pagosList:Array<pagos> = [];
  public  planesList2:Array<planes> = [];
  public pagoEstado:Array<estadoPagos> = [];
  socio: clientes = new clientes();
  socioCrear: clientesCrearDTO = new clientesCrearDTO();
  pagoEstadoI:cambiarEstadoP = new cambiarEstadoP();
  plan: planes = new planes();
  factura:pagos = new pagos();
  buscarPor : number = 0;
  buscarPor2 : number = 0;
  buscarBarra : string = "";
  facturaN : number = 0;
  modalRef!: BsModalRef; // Declaraci贸n de la propiedad modalRef
  @ViewChild('registrarSocio') modal: any;
  @ViewChild('modificarSocioNg') modalUpdate: any;
  @ViewChild('cambiarEstadoPagoModal') modalPagoestado: any;
  @ViewChild('pagosModal') pagosModalx: any;
  @ViewChild('facturadescargar', { static: false }) facturadescargar!: ElementRef;
  @ViewChild('invoice') modalInvoice: any;


    
  limpiarSocioCrear()
  {
    this.socioCrear.nombre = "";
    this.socioCrear.apellido = "";
    this.socioCrear.dnic = ""
    this.socioCrear.telefono = "";
    this.socioCrear.direccionc = "";
  }
  // get estado
  getEstadoClass(idEstado: number) {
    if (idEstado === 1) {
      return 'fila-activo'; // clase CSS para filas activas
    } else if (idEstado === 2) {
      return 'fila-suspendido'; // clase CSS para filas suspendidas
    } else {
      return ''; // si no se cumple ninguna condici贸n, no se aplica ninguna clase
    }
  }
  
  ngOnInit(): void {
    this.getUserAll(this.buscarPor, this.buscarPor2, this.buscarBarra);
    this.getPlanesAll();
    this.listarEstadoPagos();
  }

  crearCliente(cliente: clientesCrearDTO){
       this.recService.crearCliente(cliente).subscribe(respuesta => {
        if(respuesta == true)
        {
          this.notificacion.correcto("El cliente " + cliente.nombre +' ' + cliente.apellido + " Fue creado correctamente");
          this.getUserAll(0, 0, "");
          this.limpiarSocioCrear();
        } else {
          this.notificacion.errorm("No se pudo crear el cliente");
        }
       })
  }

  FacturaDescargarP?: pagos;

  constructor(private renderer: Renderer2, private modalServices: BsModalService, private recService:ListarClientesService, private jwtutilidades: JwtserviceService, private modalService: BsModalService, private notificacion:SweetalertutilService, private planesService:PlanesService)
  {
  }

  verEstado() {
      this.modalRef = this.modalService.show(this.modalInvoice);
  }


  setearFactura(pago: pagos): Promise<void> {
    return new Promise<void>((resolve) => {
      this.FacturaDescargarP = pago;
      resolve();  // Resuelve la promesa despu閟 de setear la factura
    });
  }

 async descargarFactura(pago : pagos) {
  this.setearFactura(pago);
  await new Promise(resolve => setTimeout(resolve, 500)); 
    console.log(pago);
      const element = this.facturadescargar.nativeElement;
      if (this.facturadescargar) {
        this.facturadescargar.nativeElement.style.visibility = 'visible';
      }
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
       const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('factura.pdf');
        this.facturadescargar.nativeElement.style.visibility = 'hidden';
     setTimeout(() => {
          URL.revokeObjectURL(imgData);
        }, 3000);
     });
      
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


  listarEstadoPagos()
  {
    this.recService.listarEstadoPagos().subscribe(informacion => {
      this.pagoEstado = informacion;
    })
  }

  getUserAll(buscarPor : number, buscarPor2: number, buscarBarra : string)
  {
      this.recService.getUserAll(buscarPor, buscarPor2, buscarBarra).subscribe (cliente => {
        this.sociosList = cliente;
      });
  }
   idPersona:number = 0;
  getPagos(id: number, template : any)
  {
      this.recService.getPagos(id).subscribe (pagos => {
        this.pagosList = pagos;
      });
       this.idPersona = id;
      const config: ModalOptions = {
        class: 'modal-lg' // Tama帽o grande (large)
        // Puedes agregar otras opciones de configuraci贸n si las necesitas
      };

  this.modalRef = this.modalService.show(template, config);
  }


getpagos2(){
  this.recService.getPagos(this.idPersona).subscribe (pagos => {
    this.pagosList = pagos;
  });
}
estadoVar : string = '';

 checkEstado(estado : number)
 {
 if(estado == 1)
 {
  return  this.estadoVar = 'Pagos pendiente';
 } else if (estado == 2)
 {
  return this.estadoVar = 'Al dia';
 } else 
 {
 return this.estadoVar = 'Pagos vencidos';
 }
 }
  borrarSocio(socio:clientes){
    Swal.fire({
      title: 'Eliminar Socio',
      html: '驴Deseas borrar el socio ' + '<br>' +socio.nombre + ' '+socio.apellido + '<br> DNI: ' + socio.dnic + ' <br> Telefono: ' +socio.telefono+  '<br>Servicio: ' + socio.servicio + '<br>Estado: ' + this.checkEstado(socio.idestadoc) +'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.recService.borrarCliente(socio.idcliente).subscribe(info =>{
          if(info == true){
           this.notificacion.correcto("El socio " + socio.nombre + " se borr贸 correctamente");
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
 if (
  this.socioCrear.nombre.trim() === '' ||
  this.socioCrear.apellido.trim() === '' ||
  this.socioCrear.dnic.trim() === '' ||
  this.socioCrear.telefono.trim() === '' ||
  this.socioCrear.direccionc.trim() === ''
) {
  this.notificacion.errorm('Verifique los campos')
} else {
this.crearCliente(this.socioCrear);
this.modalRef.hide();
}
}


crearSocioModal()
{
  this.modalRef = this.modalService.show(this.modal);
}


modificarSocio(socio: clientes){
  this.socioCrear.idcliente = socio.idcliente;
  this.socioCrear.nombre = socio.nombre;
  this.socioCrear.apellido = socio.apellido;
  this.socioCrear.dnic = socio.dnic;
  this.socioCrear.telefono = socio.telefono;
  this.socioCrear.direccionc = socio.direccionc;
  this.modalRef = this.modalService.show(this.modalUpdate);
  }
  
  modificarSocio2(socio : clientesCrearDTO)
  {
    this.recService.actualizarCliente(socio).subscribe(info =>{
      if(info == true)
      {
        this.notificacion.correcto("Socio actualizado correctamente")
        this.getUserAll(0, 0, "");
      } else {
        this.notificacion.errorm("Hubo un error al actualizar el cliente");
      }
    }) 
  }

  submitUpdatedForm(){
    if (
      this.socioCrear.nombre.trim() === '' ||
      this.socioCrear.apellido.trim() === '' ||
      this.socioCrear.dnic.trim() === '' ||
      this.socioCrear.telefono.trim() === '' ||
      this.socioCrear.direccionc.trim() === '' ||
      this.socioCrear.idServicio === 0
    ) {
      this.notificacion.errorm('Verifique los campos')
    } else {
    this.modificarSocio2(this.socioCrear)
    this.modalRef.hide();
    }
  }


modificarPago(factura:cambiarEstadoP){
 this.recService.actualizarPagos(factura).subscribe(info => {
  if(info == true)
  {
    this.notificacion.correcto("El pago se actualiz贸 correctamente");
    this.modalRef.hide();
    this.getpagos2()
    this.getUserAll(this.buscarPor, this.buscarPor2, this.buscarBarra);
  } else {
    this.notificacion.errorm("No se pudo actualizar el pago correctamente");
  }
 })
}

  submitEstadoForm(){
    if(this.pagoEstadoI.idestado == 0){
      this.notificacion.errorm('Verifique los campos')
    } else {
      this.modificarPago(this.pagoEstadoI)
    }
  }

  cambiarEstadoPago(factura:pagos){
    this.pagoEstadoI.idfactura = factura.idfactura;
    this.modalRef = this.modalService.show(this.modalPagoestado);
  }

  
}
