import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { BranchData } from '../branch/branch.component';
import { MatTableDataSource } from '@angular/material';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { AngularFireStorage } from 'angularfire2/storage';

declare var require: any;

const dataProductType: any = require('./data-product-type.json');
const dataBranch: any = require('app/system/branch/data.json');
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

  displayedColumns: string[] = ['code', 'name', 'productType', 'stock', 'star'];
  showProductsTable: boolean = false;
  selectedBranch: any;
  dataSource: MatTableDataSource<ProductData>;

  producttypes: ProductTypeData[] = dataProductType;
  branches: BranchData[] = dataBranch;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;files  = [];  

  constructor(private storage: AngularFireStorage) {
      const products = dataProduct;
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.filterPredicate = (data, filter) => {
        const dataStr = data.code + data.name + data.productType.name + data.stock;
        return dataStr.toLowerCase().indexOf(filter) !== -1;
      };
   }
   
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProductsFromBranch(obj) {
    console.log('$event', obj.value);
    this.selectedBranch = obj.value;
    this.showProductsTable = true;
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = ''
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    console.log('formData: ', formData);
    /*
    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
    */
  }

  importProducts() {
    const fileUpload = this.fileUpload.nativeElement; 
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0});
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  saveBlob(blob, fileName) {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.dispatchEvent(new MouseEvent('click'));
}

  downloadTemplate() {
    console.log('downloading template');
    // Create a reference with an initial file path and name
    const storage = this.storage;
    const templatePathReference = storage.ref('templates/add_medicines_template.xlsx');

    templatePathReference.getDownloadURL().subscribe(url => {
      console.log('url: ', url);
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
        // Gets file in blob format
        const blob = xhr.response;
        // Creates and element to download the file
        const p = document.createElement('p');
        const a = document.createElement('a');
        p.appendChild(a);
        a.href = window.URL.createObjectURL(blob);
        a.download = 'plantilla_agregar_productos.xlsx';
        a.dispatchEvent(new MouseEvent('click'));
        // Removes an element from the document
        p.removeChild(a);
      };
      xhr.open('GET', url);
      xhr.send();
    });

  }

  applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

}
