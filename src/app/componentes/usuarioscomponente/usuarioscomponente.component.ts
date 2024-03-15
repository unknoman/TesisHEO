import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Rol } from 'src/app/modelos/Rol';
import { respuesta } from 'src/app/modelos/respuesta';
import { usuarioActualizar } from 'src/app/modelos/usuarioActualizar';
import { usuarioCrear } from 'src/app/modelos/usuarioCrear';
import { usuarioO } from 'src/app/modelos/usuarioO';
import { UsuariosServiceService } from 'src/app/servicios/usuarios/usuarios-service.service';
import { SweetalertutilService } from 'src/app/utilidades/sweetalertutil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarioscomponente',
  templateUrl: './usuarioscomponente.component.html',
  styleUrls: ['./usuarioscomponente.component.css']
})
export class UsuarioscomponenteComponent {


  UsuarioR: usuarioO = new usuarioO();
  public usuariosList:Array<usuarioO> = [];
  usuarioCrear1 : usuarioCrear = new usuarioCrear();
  usuarioModificar1 :usuarioActualizar = new usuarioActualizar();

  public roles:Array<Rol> = [];

  modalRef!: BsModalRef; // Declaración de la propiedad modalRef
  @ViewChild('registrarUsuario') modalUsuario: any;
  @ViewChild('modificarUsuario') modalModificar: any;

  constructor(private usuarios: UsuariosServiceService, private alerta:SweetalertutilService, private modalServices: BsModalService){

  }

  nuevoUsuario(){
    this.modalServices.show(this.modalUsuario);
   }


   modificarUsuariom(usuario : usuarioO){
     this.usuarioModificar1.idusuario = usuario.idusuario;
     this.usuarioModificar1.idrol = usuario.idrol;
     this.usuarioModificar1.password = usuario.password;
    this.modalServices.show(this.modalModificar);
   }

  ngOnInit(): void {
this.actualizarTodo();
  }
 
  getRoles()
  {
    this.usuarios.getRol().subscribe(opciones => {
      this.roles = opciones;
    })
  }


  getUser()
  {
    this.usuarios.getUser().subscribe(usuarios => {
      this.usuariosList = usuarios;
    })
  }

  registrarUsuario(usuario : usuarioCrear)
  {
    this.usuarios.crearUsuario(usuario).subscribe(mensaje => {
      if(mensaje.estadoRespuesta == true)
      {
        this.alerta.correcto(mensaje.mensajeRespuesta);
        this.actualizarTodo();
        this.modalServices.hide();
      } else
      {
        this.alerta.errorm(mensaje.mensajeRespuesta);
      }
    })

  }

  actualizarTodo()
  {
    this.getUser();
    this.getRoles();
  }

  submitFormModificar()
  {
    console.log(this.usuarioModificar1);
    this.usuarios.actualizarUsuario(this.usuarioModificar1).subscribe(mensaje=> {
      if(mensaje.estadoRespuesta == true)
      {
         this.alerta.correcto(mensaje.mensajeRespuesta);
         this.actualizarTodo();
         this.modalServices.hide();
      } else{
        this.alerta.errorm(mensaje.mensajeRespuesta);
      }
    })
    
  }
  
  submitForm(){
   this.registrarUsuario(this.usuarioCrear1);
  }



  
  borrarUsuario(usuario : usuarioO){
    Swal.fire({
      title: 'Eliminar Usuario',
      text: '¿Deseas borrar el usuario ' + usuario.usuario1 + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
      if (result.isConfirmed) {
           this.usuarios.eliminarUsuario(usuario.idusuario).subscribe(mensaje => {
          if(mensaje.estadoRespuesta == true)
          {
            this.alerta.correcto(mensaje.mensajeRespuesta);
            this.actualizarTodo();
          } else 
          {
            this.alerta.errorm(mensaje.mensajeRespuesta);
          }
           })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
      } 
    });
  }
}
