import { Injectable } from '@angular/core';
import { LoginService } from '../public/login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:8080/identity/authentication';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new Headers();

  constructor(
    public http: HttpClient,
    public authService: LoginService
  ) {
  
   }

   getInfoUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'X-Platform': 'WEB'
      })
    };
     return this.http.post(URL, null, httpOptions);
   }

}
