import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../service/product/product.service";
import { IProduct } from "../../../../common/types";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public product: IProduct = {};
  public productTypes = [];

  constructor(private _productService: ProductService,
  private route: ActivatedRoute) { }

  ngOnInit(): void {
    let branchId = this.route.snapshot.params.branchId;
    console.log('branchId: ', branchId);
    this.getProductTypes();
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

}
