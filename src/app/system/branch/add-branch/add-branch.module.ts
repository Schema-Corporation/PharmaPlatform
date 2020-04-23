import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddBranchComponent } from './add-branch.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    MatGoogleMapsAutocompleteModule,
    NgxMaterialTimepickerModule.setLocale('es-419'),
    AgmCoreModule.forRoot(environment.GOOGLE_MAPS_CONFIG),
    FormsModule
  ],
  declarations: [AddBranchComponent]
})
export class AddBranchModule {}