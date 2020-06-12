import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIMiddleware } from '../APIMiddleware';
import { Observable } from 'rxjs';

const URL = "http://34.120.75.160/medicines/stock/create"


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(    private http: HttpClient,
    public apiMiddleware: APIMiddleware
    ) { }

    public saveFile(branchId: string, body: any): Observable<any> {
      return this.apiMiddleware.doPOSTMultipartFile(URL + `?branchId=${branchId}`, body);
    }

}
