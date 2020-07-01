import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsComponent } from './statistics.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FirestoreService } from '../../service/statistic/firestore/firestore.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APIMiddleware } from '../../service/APIMiddleware';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [APIMiddleware, AngularFirestore, 
        { provide: FirestoreService, useValue: {} },
        { provide: AngularFireStorage, useValue: {} }, 
        { provide: NgxIndexedDBService, useValue: {} }
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
