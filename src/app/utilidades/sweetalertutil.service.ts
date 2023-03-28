import { Injectable } from '@angular/core';
import Swal
 from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SweetalertutilService {

  constructor() { }
 

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  correcto(mensaje : string)
  {
    this.Toast.fire({
      icon: 'success',
      title: mensaje
    })

  }


  errorm(mensaje : string)
  {
    this.Toast.fire({
      icon: 'error',
      title: mensaje
    })

  }
}
