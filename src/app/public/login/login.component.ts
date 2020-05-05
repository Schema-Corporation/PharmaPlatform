import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { MySweetAlert } from '../../../common/utils';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public userName: string;
  public password: string;
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(
    private  _loginService:  LoginService,
    private _authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    console.log(this._loginService.getToken())
    if (this._loginService.getToken()) {
      this.isLoggedIn=true;
      this.router.navigateByUrl('/system/branch');
    }
  }

  storeFirebaseLoginInfo(token) {
    this._loginService.saveToken(token);
    this.validateUser();
  }

  login() {
    this._loginService.login(this.userName, this.password)
    .then(firebaseData => {
      this._loginService.saveUser(firebaseData.user.email);
      firebaseData.user.getIdToken().then(token => {
          this.storeFirebaseLoginInfo(token)
        }
      );
      this.toDashBoard();
      
    }).catch(error => {
      if (error.code) {
        this.isLoginFailed = true;
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

  toDashBoard() {
    this.router.navigateByUrl('/system/branch');
  }


  validateUser() {
    this._authService.getInfoUser().subscribe(
      data => {
        console.log('data: ', data);
        this.isLoginFailed = false;
        this.isLoggedIn=true;
      }
    );
  }
}
