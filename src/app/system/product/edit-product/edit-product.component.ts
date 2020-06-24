import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from "../../../service/product/product.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { MySweetAlert } from '../../../../common/utils/alert';
import { IStock } from '../../../../common/types/stock';

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
  private navigationRoute: Router) { }

  ngOnInit(): void {

    this.getProductTypes();

    const stockId = this.route.snapshot.params.stockId;

    this._productService.viewProduct(stockId).subscribe(
      data => {
        this.product =  data;
      }
    );

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
              console.log('url: ', this.product.imgUrl);
              this._productService.updateProduct(this.product).subscribe(
                data => {
                  console.log('data', data);
                  MySweetAlert.showSuccess("El producto ha sido actualizado con éxito");
                  this.navigationRoute.navigateByUrl("/system/product");

                }
              );
            }
          );

        }
      );
    } else {
      this._productService.updateProduct(this.product).subscribe(
        data => {
          console.log('data', data);
          MySweetAlert.showSuccess("El producto ha sido actualizado con éxito");
          this.navigationRoute.navigateByUrl("/system/product");

        }
      );
    }

  }

  getProductTypes() {
    this._productService.getProductTypes().subscribe(
      data => {
        this.productTypes = data;
      }
    );
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
