import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIMiddleware } from '../APIMiddleware';

const URL = "https://pharmaapp-services-be.com/pharmacies/branch";



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

  public viewBranch(branchId): Observable<any> {
    return this.apiMiddleware.doGET(URL + `/view?BranchId=${branchId}`)
  }

  public updateBranch(branch): Observable<any> {
    return this.apiMiddleware.doPOST(URL + '/update', branch);
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

  getBranchNamesByCompanyId(id: string){

    return this.apiMiddleware.doGET(URL+ `/list?companyId=${id}`);
  }
}
