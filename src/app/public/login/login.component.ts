import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { MySweetAlert } from '../../../common/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public userName: string;
  public password: string;

  constructor(
    private  _loginService:  LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login() {
    this._loginService.login(this.userName, this.password)
    .then(x => {
      console.log('x: ', x);
      this.router.navigate(['/system/branch']);
    }).catch(error => {
      if (error.code) {
        const errorCode = error.code;
        let errorMessage = '';
        switch (errorCode) {
          case 'auth/wrong-password': errorMessage = 'La contraseña es incorrecta o el usuario aún no cuenta con una contraseña'; break;
          case 'auth/invalid-email': errorMessage = 'La dirección de correo no cumple con el formato'; break;
          case 'auth/user-not-found': errorMessage = 'No existe un usuario asociado a esta cuenta de correo'; break;
          default: errorMessage = 'Ocurrió un error inesperado. Contacte con el administrador'; break;
        }
        MySweetAlert.showError(errorMessage);
      } else {
        MySweetAlert.showError('Ocurrió un error inesperado. Contacte con el administrador');
      }
    });
  }

}
