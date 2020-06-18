import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BranchService } from './branch.service';
import { APIMiddleware } from '../APIMiddleware';


describe('BranchService', () => {

  beforeEach(() => { TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [APIMiddleware]
    });
  });

  it('should be created', () => {
    const service: BranchService = TestBed.get(BranchService);
    expect(service).toBeTruthy();
  });
});
