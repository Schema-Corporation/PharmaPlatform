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

  public saveBranchIndexDB(branch, token: string, company: string): Observable<any> {
    return this.apiMiddleware.doPOSTIndexDB(URL, token, company, branch);
  }

  public viewBranch(branchId): Observable<any> {
    return this.apiMiddleware.doGET(URL + `/view?BranchId=${branchId}`)
  }

  public viewBranchIndexDB(branchId, token: string, company: string): Observable<any> {
    return this.apiMiddleware.doGETIndexDB(URL + `/view?BranchId=${branchId}`, token, company)
  }

  public updateBranch(branch): Observable<any> {
    return this.apiMiddleware.doPOST(URL + '/update', branch);
  }

  public updateBranchIndexDB(branch, token: string, company: string): Observable<any> {
    return this.apiMiddleware.doPOSTIndexDB(URL + '/update', token, company, branch);
  }

  public getBranchesById(id: string): Observable<any> {
    return this.apiMiddleware.doGET(URL + `?companyId=${id}`);
  }

  public getBranchesByIdIndexDB(id: string, token: string, company: string): Observable<any> {
    return this.apiMiddleware.doGETIndexDB(URL + `?companyId=${id}`, token, company);
  }

  public getBranchNamesByCompanyId(id: string) {
    return this.apiMiddleware.doGET(URL + `/list?companyId=${id}`);
  }

  public getBranchNamesByCompanyIdIndexDB(id: string, token: string, company: string) {
    return this.apiMiddleware.doGETIndexDB(URL + `/list?companyId=${id}`, token, company);
  }
}
