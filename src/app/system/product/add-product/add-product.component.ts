import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from "../../../service/product/product.service";
import { IProduct } from "../../../../common/types";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  show: boolean = true;
	urlImage: Observable<string>;
  public product: IProduct = {};
  public productTypes = [];

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;

  constructor(
  private _productService: ProductService,
  private route: ActivatedRoute,
  private storage: AngularFireStorage) { }

  ngOnInit(): void {
    let branchId = this.route.snapshot.params.branchId;
    console.log('branchId: ', branchId);
    this.getProductTypes();
    //this.urlImage = {"https://simpleicon.com/wp-content/uploads/cloud-upload-1.png"};
  }

  registerProduct() {
    this._productService.saveProduct(this.product).subscribe(
      data => {
        console.log('data', data);
        // MySweetAlert.showSuccess("La sucursal ha sido agregada con éxito");
      }
    );
  }

  getProductTypes() {
    this._productService.getProductTypes().subscribe(
      data => {
        this.productTypes = data;
        console.log('data', data);
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
      this.urlImage = event.target.result;
      this.show = false;
      console.log('urlIMAGE: ', this.urlImage)
		  }
		  reader.readAsDataURL(event.target.files[0]);
		}
		console.log('subir', event.target.files[0]);
		const id = Math.random().toString(36).substring(2);
		const file = event.target.files[0];
		const filePath = `uploads/profile_${id}`;
		//const ref = this.storage.ref(filePath);
		//const task = this.storage.upload(filePath, file);
    //task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    
   }

}
