import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { SystemComponent } from "./system.component";
import { systemRoutes } from "./system.routes";

import { BranchComponent } from "./branch/branch.component";
import { AddBranchComponent } from "./branch/add-branch/add-branch.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductComponent } from "./product/product.component";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { StatisticsComponent } from "./statistics/statistics.component";

import { DemoMaterialModule } from '../demo-material-module';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { ChartistModule } from 'ng-chartist';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SystemComponent,

    
    BranchComponent,
    AddBranchComponent,
    DashboardComponent,
    ProductComponent,
    AddProductComponent,
    StatisticsComponent

  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    MatGoogleMapsAutocompleteModule,
    ChartistModule,
    NgxMaterialTimepickerModule.setLocale('es-419'),
    AgmCoreModule.forRoot(environment.GOOGLE_MAPS_CONFIG),
    FormsModule,
    RouterModule.forChild(systemRoutes),
  ]
})
export class SystemModule { }
