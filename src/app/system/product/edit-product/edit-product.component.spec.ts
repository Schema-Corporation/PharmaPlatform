import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { EditProductComponent } from './edit-product.component';
import { APIMiddleware } from '../../../service/APIMiddleware'
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [APIMiddleware, AngularFirestore,
         { provide: AngularFireStorage, useValue: {} }, 
         { provide: NgxIndexedDBService, useValue: {} }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
