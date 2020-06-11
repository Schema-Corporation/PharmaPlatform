import { Injectable } from "@angular/core";
import { LoginService } from "../public/login/login.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class APIMiddleware {
  constructor(public http: HttpClient) {}

  doGET(url: string): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "X-Company-Id": JSON.parse(JSON.stringify(localStorage.getItem('companyId'))),
        "X-Platform": "WEB",
      }),
    };
    return this.http.get(url, httpOptions);
  }

  doAuthenticate(url: string, body?: any): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "X-Platform": "WEB"
      }),
    };
    return this.http.post(url, body, httpOptions);
  }

  doPOST(url: string, body?: any): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "X-Company-Id": localStorage.getItem("companyId"),
        "X-Platform": "WEB"
      }),
    };
    return this.http.post(url, body, httpOptions);
  }

  doPOSTMultipartFile(url: string, body?: any): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({

        Authorization: "Bearer " + localStorage.getItem("token"),
        "X-Company-Id": localStorage.getItem("companyId"),
        "X-Platform": "WEB"
      }),
    };
    return this.http.post(url, body, httpOptions);
  }

  doPUT(url: string, body?: any): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "X-Company-Id": localStorage.getItem("companyId"),
        "X-Platform": "WEB",
      }),
    };
    return this.http.put(url, body, httpOptions);
  }

  doDELETE(url: string): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "X-Company-Id": localStorage.getItem("companyId"),
        "X-Platform": "WEB",
      }),
    };
    return this.http.delete(url, httpOptions);
  }
}
