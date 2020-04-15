import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public userName: string;
  public password: string;

  constructor(private  _loginService:  LoginService) { }

  ngOnInit(): void {
  }

  login() {
    this._loginService.login(this.userName, this.password);
  }

}
