import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIMiddleware } from '../APIMiddleware';

const URL = "http://localhost:8082/medicines/";
const PRODUCT = "product"
const PRODUCT_TYPES = "product_types"

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(
    private http: HttpClient,
    public apiMiddleware: APIMiddleware
  ) { }

  public saveProduct(product): Observable<any> { 
    return this.apiMiddleware.doPOST(URL + PRODUCT, product);
  }


  public getProductTypes(): Observable<any> {
    return this.apiMiddleware.doGET(URL + PRODUCT_TYPES);
  }
}
