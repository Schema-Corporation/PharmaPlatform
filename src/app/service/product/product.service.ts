import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIMiddleware } from '../APIMiddleware';

const URL = 'https://pharmaapp-services-be.com/medicines/';
const STOCK = 'stock/';
const VIEW = 'view';
const UPDATE = 'update';
const PRODUCT_TYPES = 'product-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    public apiMiddleware: APIMiddleware
  ) { }

  public saveProduct(branchId: string, product): Observable<any> {
    return this.apiMiddleware.doPOST(URL + STOCK + `?branchId=${branchId}`, product);
  }

  public getProductByBranchId(branchId: string): Observable<any> {
    return this.apiMiddleware.doGET(URL + "stock" + `?branchId=${branchId}`);
  }

  public updateProduct(product): Observable<any> {
    return this.apiMiddleware.doPOST(URL + STOCK + UPDATE, product);
  }

  public getProductTypes(): Observable<any> {
    return this.apiMiddleware.doGET(URL + PRODUCT_TYPES);
  }

  public viewProduct(stockId: string): Observable<any> {
    return this.apiMiddleware.doGET(URL + STOCK + VIEW + `?stockId=${stockId}`);
  }
}
