import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddBranchComponent } from './add-branch.component';
import { AddBranchRoutes } from './add-branch.routing';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

const googleMapsParams = {
  apiKey: environment.GOOGLE_MAPS_API_KEY,
  libraries: ['places'],
  language: 'es',
};


@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    MatGoogleMapsAutocompleteModule,
    NgxMaterialTimepickerModule.setLocale('es-419'),
    RouterModule.forChild(AddBranchRoutes),
    AgmCoreModule.forRoot(googleMapsParams),
    FormsModule
  ],
  declarations: [AddBranchComponent]
})
export class AddBranchModule {}