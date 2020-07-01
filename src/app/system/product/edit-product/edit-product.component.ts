import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from "../../../service/product/product.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { MySweetAlert } from '../../../../common/utils/alert';
import { IStock } from '../../../../common/types/stock';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  show: boolean = true;
  filePath: string = "";
  file: any = null;
  LocalImageUrl: Observable<string>;
  FirebaseImageUrl: Observable<string>;
  public product: IStock = {};
  public productTypes = [];
  public changeImage: boolean = false;

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;

  constructor(
  private _productService: ProductService,
  private route: ActivatedRoute,
  private storage: AngularFireStorage,
  private navigationRoute: Router,
  private dbService: NgxIndexedDBService) { }

  ngOnInit(): void {

    this.getProductTypes();

    const stockId = this.route.snapshot.params.stockId;

    this.dbService.getByIndex('variables', 'name', 'token').then(
      token => {
        this.dbService.getByIndex('variables', 'name', 'companyId').then(
          companyId => {
            this._productService.viewProductIndexDB(stockId, token.value, companyId.value).subscribe(
              data => {
                this.product =  data;
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

  updateProduct() {
    if (this.changeImage) {
      const ref = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, this.file);
      task.snapshotChanges().subscribe(
        data => {
          this.FirebaseImageUrl = ref.getDownloadURL();
          this.FirebaseImageUrl.subscribe(
            imageURL => {
              this.product.imgUrl = imageURL;

              var b = this.product.amount + "true";
              console.log("Valor de B: ", b)
              if ( b == "true"){
                this.product.amount = null;
              }

              if (this.product.code.length > 0 &&
                this.product.commercialName.length > 0 &&
                this.product.labName.length > 0  &&
                this.product.amount != null &&
                this.product.useDescription.length > 0  &&
                this.product.price > 0.01) {

                console.log('url: ', this.product.imgUrl);
                this.dbService.getByIndex('variables', 'name', 'token').then(
                  token => {
                    this.dbService.getByIndex('variables', 'name', 'companyId').then(
                      companyId => {
                        this._productService.updateProduct(this.product).subscribe(
                          data => {
                            console.log('data', data);
                            MySweetAlert.showSuccess("El producto ha sido actualizado con éxito");
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
            } else {
              MySweetAlert.showError("Por favor, complete los campos obligatorios");
            }
          }
          );

        }
      );
    } else {
      var a = this.product.amount + "true"
      console.log("Valor de A: ", a)
      if ( a == "true"){
        this.product.amount = null;
      }

      if (this.product.code.length > 0 &&
        this.product.commercialName.length > 0 &&
        this.product.labName.length > 0  &&
        this.product.amount != null &&
        this.product.useDescription.length > 0  &&
        this.product.price > 0.01) {

          this.dbService.getByIndex('variables', 'name', 'token').then(
            token => {
              this.dbService.getByIndex('variables', 'name', 'companyId').then(
                companyId => {
                  this._productService.updateProduct(this.product).subscribe(
                    data => {
                      console.log('data', data);
                      MySweetAlert.showSuccess("El producto ha sido actualizado con éxito");
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


      } else {
        MySweetAlert.showError("Por favor, complete los campos obligatorios");
      }
    }
  }

  omitSpecialCharacter(event){
		var k;
		k = event.charCode;
		return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 225 || k==233 || k==237 || k==243 || k==250 || k == 32 || (k >= 48 && k <= 57));
	 }

  getProductTypes() {
    this.dbService.getByIndex('variables', 'name', 'token').then(
      token => {
        this.dbService.getByIndex('variables', 'name', 'companyId').then(
          companyId => {
            this._productService.getProductTypesIndexDB(token.value, companyId.value).subscribe(
              data => {
                this.productTypes = data;
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
		const id = Math.random().toString(36).substring(2);
		this.file = event.target.files[0];
    this.filePath = `uploads/profile_${id}`;

    this.changeImage = true;
  }
}
