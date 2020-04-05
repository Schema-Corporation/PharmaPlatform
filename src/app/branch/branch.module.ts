import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BranchComponent } from './branch.component';
import { BranchRoutes } from './branch.routing';
import { ChartistModule } from 'ng-chartist';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    RouterModule.forChild(BranchRoutes)
  ],
  declarations: [BranchComponent]
})
export class BranchModule {}
