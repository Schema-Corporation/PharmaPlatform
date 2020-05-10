import { Injectable } from "@angular/core";
import { LoginService } from "../public/login/login.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { APIMiddleware } from "./apiMiddleware";
import { apiUrls } from "../../common/constants";

//const URL = 'http://localhost:8080/identity/authentication';
const URL = apiUrls.AUTH;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  headers = new Headers();

  constructor(

    public http: HttpClient,
    public authService: LoginService,
    public apiMiddleware: APIMiddleware
  ) {}

  getInfoUser(): Observable<any> {
    /*const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "X-Platform": "WEB",
      }),
    };*/
    return this.apiMiddleware.doPOST(URL + "authentication");
    //return this.http.post(URL, null, httpOptions);
  }
}
