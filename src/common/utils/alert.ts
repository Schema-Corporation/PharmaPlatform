import Swal from 'sweetalert2';

export class MySweetAlert {
  static showError(message: string, title?: string) {
    Swal.fire({
      title: title ? title : 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#fc4b6c'
    });
  }

  static showSuccess(message: string, title?: string) {
    Swal.fire({
      title: title ? title : 'Correcto',
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#26c6da'
    });
  }

  static showWarning(message: string, title?: string) {
    Swal.fire({
      title: title ? title : 'Advertencia',
      text: message,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ffb22b',
      cancelButtonColor: '#fc4b6c'
    });
  }
}
