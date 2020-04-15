
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './system/layouts/full/full.component';
import { PublicComponent } from './public/public.component';
import { LoginComponent } from './public/login/login.component';
import { AppHeaderComponent } from './system/layouts/full/header/header.component';
import { AppSidebarComponent } from './system/layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './system/shared/shared.module';
import { SpinnerComponent } from './system/shared/spinner.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    PublicComponent,
    LoginComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    MatGoogleMapsAutocompleteModule,
    NgxMaterialTimepickerModule,
    AgmCoreModule.forRoot(environment.GOOGLE_MAPS_CONFIG),
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFireStorageModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
