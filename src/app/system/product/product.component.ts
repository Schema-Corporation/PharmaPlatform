import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { BranchData } from '../branch/branch.component';
import { MatTableDataSource } from '@angular/material';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { AngularFireStorage } from 'angularfire2/storage';
import { BranchService } from '../../service/branch/branch.service';
import { UploadService } from '../../service/upload/upload.service';
import { ProductService } from '../../service/product/product.service';

export interface BranchList {
  id: string;
  branchName: string;
}

export interface ProductData{
    id: number;
    productId: string;
    commercialName: string;
    code: string;
    stock: number;
    stockId: string;
    productType: string;
    branch: BranchData;
}

export interface BranchDataInfo {
	id: number;
	name: string;
	addressName: string;
	schedule: string;
	status: string;
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

  branches: BranchList[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;files  = [];  

  constructor(
    private storage: AngularFireStorage,
    private _branchService: BranchService,
    private _uploadService: UploadService,
    private _productService: ProductService
    ) {
      //const products = dataProduct;

      this.dataSource = new MatTableDataSource([]);
      this.dataSource.filterPredicate = (data, filter) => {
        const dataStr = data.code + data.commercialName + data.productType + data.stock;
        return dataStr.toLowerCase().indexOf(filter) !== -1;
      };
   }
   
  ngOnInit(): void {
    var id = JSON.parse(JSON.stringify(localStorage.getItem('companyId')));
		this.getBranchesByCompanyId(id);
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  getBranchesByCompanyId(id){
    this._branchService.getBranchNamesByCompanyId(id).subscribe(
			data => {
        this.branches = data;
        console.log('data: ', data);

			}
    );
  }

  getProductsFromBranch(obj) {
    
    console.log('$event', obj.value);
    this.selectedBranch = obj.value;
    this.populateProductsByBranchId();
    
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = ''
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('multipartFile', file.data);
    file.inProgress = true;
    console.log('formData: ', formData);
    
    this._uploadService.saveFile(this.selectedBranch.id, formData).subscribe(
      data => {
        console.log('data: ', data);
        this.populateProductsByBranchId();
        
      }
    )
  }

  populateProductsByBranchId(){

    this._productService.getProductByBranchId(this.selectedBranch.id).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.showProductsTable = true;
      }
    );
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
