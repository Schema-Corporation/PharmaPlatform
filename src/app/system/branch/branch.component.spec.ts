import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { BranchComponent } from './branch.component';
import { APIMiddleware } from '../../service/APIMiddleware';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import  { NgxIndexedDBService } from 'ngx-indexed-db'

describe('BranchComponent', () => {
  let component: BranchComponent;
  let fixture: ComponentFixture<BranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ 
      declarations: [ BranchComponent ],    
      imports: [HttpClientTestingModule],
      providers: [APIMiddleware,MatPaginator,MatSort,MatTableDataSource,
        { provide: NgxIndexedDBService, useValue: {} }
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
