import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from "../../../service/product/product.service";
import { IProduct } from "../../../../common/types";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { MySweetAlert } from '../../../../common/utils/alert';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  show: boolean = true;
  filePath: string = "";
  file: any = null;
  LocalImageUrl: Observable<string>;
  FirebaseImageUrl: Observable<string>;
  public product: IProduct = {};
  public productTypes = [];

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;

  constructor(
  private _productService: ProductService,
  private route: ActivatedRoute,
  private storage: AngularFireStorage,
  private navigationRoute: Router,
  private dbService: NgxIndexedDBService) { }

  ngOnInit(): void {

    this.getProductTypes();
    //this.urlImage = {"https://simpleicon.com/wp-content/uploads/cloud-upload-1.png"};
  }

  registerProduct() {
    let branchId = this.route.snapshot.params.branchId;
    const ref = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.file);
    task.snapshotChanges().subscribe(
      data => {
        this.FirebaseImageUrl = ref.getDownloadURL();
        this.FirebaseImageUrl.subscribe(
          imageURL => {
            //console.log('dataURL: ', dataURL);
            this.product.imgUrl = imageURL;

            if (this.product.code != undefined &&
              this.product.commercialName != undefined &&
              this.product.labName != undefined &&
              this.product.amount != undefined &&
              this.product.productType != undefined &&
              this.product.useDescription != undefined &&
              this.product.price != undefined) {

                console.log('url: ', this.product.imgUrl);
                this.dbService.getByIndex('variables', 'name', 'token').then(
                  token => {
                    this.dbService.getByIndex('variables', 'name', 'companyId').then(
                      companyId => {
                        this._productService.saveProductIndexDB(branchId, token.value, companyId.value, this.product).subscribe(
                          data => {
                            console.log('data', data);
                            MySweetAlert.showSuccess("El producto ha sido agregado con éxito");
                            this.navigationRoute.navigateByUrl("/system/product");

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

              }else {
                MySweetAlert.showError("Por favor, complete los campos obligatorios");
              }

          }
        );

      }
    );


  }

  getProductTypes() {
    this.dbService.getByIndex('variables', 'name', 'token').then(
      token => {
        this.dbService.getByIndex('variables', 'name', 'companyId').then(
          companyId => {
            this._productService.getProductTypesIndexDB(token.value, companyId.value).subscribe(
              data => {
                this.productTypes = data;
                //console.log('data', data);
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

  omitSpecialCharacter(event){
		var k;
		k = event.charCode;
		return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 225 || k==233 || k==237 || k==243 || k==250 || k == 32 || (k >= 48 && k <= 57));
	 }

  uploadImg(){
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.click();
  }

  readUrl(event:any) {
		if (event.target.files && event.target.files[0]) {
		  var reader = new FileReader();
		  reader.onload = (event:any) => {
      this.LocalImageUrl = event.target.result;
      this.show = false;
      console.log('LocalImageUrl: ', this.LocalImageUrl)
		  }
		  reader.readAsDataURL(event.target.files[0]);
		}
		console.log('subir', event.target.files[0]);
		const id = Math.random().toString(36).substring(2);
		this.file = event.target.files[0];
		this.filePath = `uploads/profile_${id}`;

    //la linea 55 agrega la img a Firebase

  }
}
