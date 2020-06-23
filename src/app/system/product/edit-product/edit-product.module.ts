import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditProductComponent } from './edit-product.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [EditProductComponent]
})
export class EditProductModule {}
