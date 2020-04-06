import { Component, OnInit, ViewChild } from '@angular/core';

import { BranchData } from 'app/branch/branch.component';
import { MatTableDataSource } from '@angular/material';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

declare var require: any;

const dataProductType: any = require('./data-product-type.json');
const dataBranch: any = require('app/branch/data.json');
const dataProduct: any = require('./data-product.json');

export interface ProductTypeData{
    id: number;
    name: string;
}

export interface ProductData{
    id: number;
    name: string;
    code: string;
    stock: number;
    productType: ProductTypeData;
    branch: BranchData;
    
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'code', 'stock', 'productType', 'branch'];

  producttypes: ProductTypeData[] = dataProductType;
  branches: BranchData[] = dataBranch;

  dataSource: MatTableDataSource<ProductData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
      const products = dataProduct;

      this.dataSource = new MatTableDataSource(products);
   }
   
  ngOnInit(): void {
    //console.log(this.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /*selectFilter(event: Event){

  }*/

}
