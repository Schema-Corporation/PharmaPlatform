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

  
}
