import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = "http://localhost:8081/pharmacies/branch";

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  
  constructor(
    private http: HttpClient,
    
  ) { }

  public saveBranch(branch): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      })
    };
    
    return this.http.post(URL, branch, httpOptions)
  }
}
