import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { LoginService } from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIMiddleware } from '../../service/APIMiddleware';

const AngularFireMocks = {
  auth: of({ uid: 'ABC123' })
  };


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;

  const authState = {
    displayName: null,
    isAnonymous: true,
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
  };

  const mockAngularFireAuth: any = {
    auth: jasmine.createSpyObj('auth', {
      'signInAnonymously': Promise.reject({
        code: 'auth/operation-not-allowed'
      }),
      // 'signInWithPopup': Promise.reject(),
      // 'signOut': Promise.reject()
    }),
    authState: of(authState)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers:[
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: LoginService, useClass: LoginService},
        APIMiddleware
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('should be created', inject([ LoginService ], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

});