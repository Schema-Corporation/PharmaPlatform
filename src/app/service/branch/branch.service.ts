import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIMiddleware } from '../APIMiddleware';

const URL = "http://localhost:8081/pharmacies/branch";



@Injectable({
  providedIn: 'root'
})
export class BranchService {

  
  constructor(
    private http: HttpClient,
    public apiMiddleware: APIMiddleware
  ) { }

  public saveBranch(branch): Observable<any> { 
    return this.apiMiddleware.doPOST(URL, branch);
  }


  public getBranchesById(id: string): Observable<any> {


    //let params = new URLSearchParams();
    //params.append("companyId", JSON.parse(localStorage.getItem('companyId')));
    //console.log('PARAMS: ', params);
    const httpOptions: any = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "X-Platform": "WEB",
      }),
      //params: params,
    };
    return this.http.get(URL+ `?companyId=${id}` , httpOptions);
    //return this.apiMiddleware.doGET(URL);
  }
}
