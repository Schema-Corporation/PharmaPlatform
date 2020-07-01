import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { MySweetAlert } from "../../../common/utils";
import { AuthService } from "../../service/auth/auth.service";
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  public userName: string;
  public password: string;
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(
    private _loginService: LoginService,
    private _authService: AuthService,
    private router: Router,
    private dbService: NgxIndexedDBService
  ) {}

  ngOnInit(): void {
    //console.log(this._loginService.getToken())
    if (this._loginService.getToken()) {
      this.isLoggedIn = true;
      this.router.navigateByUrl("/system/branch");
    }
    //localStorage.setItem('companyId', "2095d570-8cb6-4522-ab9d-3b68732f69f1");
  }

  storeFirebaseLoginInfo(token) {
    this._loginService.saveToken(token);
    this.dbService.add('variables', { name: 'token', value: token }).then(
      () => {
        this.dbService.getByIndex('variables', 'name', 'token').then(
          token => {
            this.validateUser(token.value);
          },
          error => {
              console.log(error);
          });
          // Do something after the value was added

      },
      error => {
          console.log("ERROR: ", error);
      }
    );

  }

  login() {
    this._loginService
      .login(this.userName, this.password)
      .then((firebaseData) => {
        this._loginService.saveUser(firebaseData.user.email);
        this.dbService.add('variables', { name: 'user', value: firebaseData.user.email }).then(
          () => {
              // Do something after the value was added
              firebaseData.user.getIdToken().then((token) => {
                this.storeFirebaseLoginInfo(token);
              });
          },
          error => {
              console.log(error);
          }
        );


      })
      .catch((error) => {
        console.log("ERROR: ", error);
        if (error.code) {
          this.isLoginFailed = true;
          const errorCode = error.code;
          let errorMessage = "";
          switch (errorCode) {
            case "auth/wrong-password":
              errorMessage =
                "La contraseña es incorrecta o el usuario aún no cuenta con una contraseña";
              break;
            case "auth/invalid-email":
              errorMessage = "La dirección de correo no cumple con el formato";
              break;
            case "auth/user-not-found":
              errorMessage =
                "No existe un usuario asociado a esta cuenta de correo";
              break;
            default:
              errorMessage =
                "Ocurrió un error inesperado. Contacte con el administrador";
              break;
          }
          MySweetAlert.showError(errorMessage);
        } else {
          MySweetAlert.showError(
            "Ocurrió un error inesperado. Contacte con el administrador"
          );
        }
      });
  }

  toDashBoard() {
    this.router.navigateByUrl("/system/branch");
  }

  validateUser(token) {

    this._authService.getInfoUser(token).subscribe(
      data => {
        console.log('data: ', data);
        //this._loginService.saveCompanyId(data.companyId);
        localStorage.setItem('companyId', data.companyId);
        this.dbService.add('variables', { name: 'companyId', value: data.companyId }).then(
          companyId => {
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.dbService.getByIndex('variables', 'name', 'companyId').then(
              companyId => {
                this.toDashBoard();
              },
              error => {
                  console.log(error);
              });
          },
          error => {
              console.log(error);
          });
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
}
