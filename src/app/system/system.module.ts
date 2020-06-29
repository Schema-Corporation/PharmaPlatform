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
import { ProfileComponent } from './profile/profile.component'

import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { SystemRoutingModule } from './system-routing.module';
import { SpinnerComponent } from './shared/spinner.component';
import { ChartistModule } from 'ng-chartist';


import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { AngularFireModule } from 'angularfire2';
import { TwoDigitDecimaNumberDirective } from '../directives/TwoDigitDecimaNumberDirective';

@NgModule({
  declarations: [
    SystemComponent,
    FullComponent,
    BranchComponent,
    AddBranchComponent,
    DashboardComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    StatisticsComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    ProfileComponent,
    SpinnerComponent,
    TwoDigitDecimaNumberDirective
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ChartistModule,
    FlexLayoutModule,
    MatGoogleMapsAutocompleteModule,
    NgxMaterialTimepickerModule.setLocale('es-419'),
    AgmCoreModule.forRoot(environment.GOOGLE_MAPS_CONFIG),
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    FormsModule,

    //RouterModule.forChild(systemRoutes),
    SystemRoutingModule
  ],
  exports: [
    SpinnerComponent
  ]
})
export class SystemModule { }
