import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddBranchComponent } from './add-branch.component';
import { APIMiddleware } from '../../../service/APIMiddleware';
import { RouterTestingModule } from "@angular/router/testing";
import { AgmCoreModule, AgmMarker} from '@agm/core'
import  { NgxIndexedDBService } from 'ngx-indexed-db'
import {
    MatGoogleMapsAutocompleteComponent,
    MatGoogleMapsAutocompleteModule
  } from "@angular-material-extensions/google-maps-autocomplete";
  import {MapsAPILoader} from '@agm/core';

  import PlaceResult = google.maps.places.PlaceResult;

  export class MockMapsAPILoader {
    public load(): Promise<boolean> {
      return new Promise(() => {
        return true;
      });
    }
  }

describe('AddBranchComponent', () => {
  let component: AddBranchComponent;
  let fixture: ComponentFixture<AddBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBranchComponent,AgmMarker],
      imports: [HttpClientTestingModule,RouterTestingModule,MatGoogleMapsAutocompleteModule, AgmCoreModule.forRoot()],
      providers: [APIMiddleware,MatGoogleMapsAutocompleteComponent,MatGoogleMapsAutocompleteComponent,NgxIndexedDBService ]
    })
    .compileComponents();
  }));

  
  beforeEach(() => {
    fixture = TestBed.createComponent(AddBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
