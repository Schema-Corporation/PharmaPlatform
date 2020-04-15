import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddProductComponent } from './add-product.component';
import { AddProductRoutes } from './add-product.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(AddProductRoutes),
    FormsModule
  ],
  declarations: [AddProductComponent]
})
export class AddProductModule {}