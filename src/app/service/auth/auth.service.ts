import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { APIMiddleware } from "../APIMiddleware";
import { apiUrls } from "../../../common/constants";

const URL = apiUrls.AUTH;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  headers = new Headers();

  constructor(

    public http: HttpClient,
    public apiMiddleware: APIMiddleware
  ) {}

  getInfoUser(): Observable<any> {
    return this.apiMiddleware.doPOST(URL + "authentication");
  }
}
