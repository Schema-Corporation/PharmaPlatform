import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddBranchComponent } from './add-branch.component';
import { AddBranchRoutes } from './add-branch.routing';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    MatGoogleMapsAutocompleteModule,
    NgxMaterialTimepickerModule.setLocale('es-419'),
    RouterModule.forChild(AddBranchRoutes)
  ],
  declarations: [AddBranchComponent]
})
export class AddBranchModule {}