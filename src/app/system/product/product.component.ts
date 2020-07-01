import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { BranchData } from '../branch/branch.component';
import { MatTableDataSource } from '@angular/material';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { AngularFireStorage } from 'angularfire2/storage';
import { BranchService } from '../../service/branch/branch.service';
import { UploadService } from '../../service/upload/upload.service';
import { ProductService } from '../../service/product/product.service';
import { MySweetAlert } from '../../../common/utils/alert';
import { NgxIndexedDBService } from 'ngx-indexed-db';

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
    private _productService: ProductService,
    private dbService: NgxIndexedDBService
    ) {
      //const products = dataProduct;

      this.dataSource = new MatTableDataSource([]);
      this.dataSource.filterPredicate = (data, filter) => {
        const dataStr = data.code + data.commercialName + data.productType + data.stock;
        return dataStr.toLowerCase().indexOf(filter) !== -1;
      };
   }

  ngOnInit(): void {
		this.getBranchesByCompanyId();

  }

  omitSpecialCharacter(event){
    var k;
    k = event.charCode;
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 225 || k==233 || k==237 || k==243 || k==250 || k == 32 || (k >= 48 && k <= 57));
  }

  getBranchesByCompanyId(){
    this.dbService.getByIndex('variables', 'name', 'token').then(
      token => {
        this.dbService.getByIndex('variables', 'name', 'companyId').then(
          companyId => {
            this._branchService.getBranchNamesByCompanyIdIndexDB(companyId.value, token.value, companyId.value).subscribe(
              data => {
                this.branches = data;
                console.log('data: ', data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
            );
          },
          error => {
              console.log(error);
          });
      },
      error => {
          console.log(error);
      });

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

    this.dbService.getByIndex('variables', 'name', 'token').then(
      token => {
        this.dbService.getByIndex('variables', 'name', 'companyId').then(
          companyId => {
            this._uploadService.saveFileIndexDB(this.selectedBranch.id, token.value, companyId.value, formData).subscribe(
              data => {
                this.populateProductsByBranchId();
                MySweetAlert.showSuccess("Los productos han sido agregados con éxito");
              }, error => {
                console.log(error);
                MySweetAlert.showError("Hubo un error al agregar los productos, por favor virifique el documento excel subido");
              }
            );
          },
          error => {
              console.log(error);
          });
      },
      error => {
          console.log(error);
      });


  }

  populateProductsByBranchId() {

    this.dbService.getByIndex('variables', 'name', 'token').then(
      token => {
        this.dbService.getByIndex('variables', 'name', 'companyId').then(
          companyId => {
            this._productService.getProductByBranchIdIndexDB(this.selectedBranch.id, token.value, companyId.value).subscribe(
              data => {
                this.dataSource = new MatTableDataSource(data);
                this.showProductsTable = true;
              }
            );
          },
          error => {
              console.log(error);
          });
      },
      error => {
          console.log(error);
      });


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
