import { TestBed } from '@angular/core/testing';
import { AngularFirestore} from '@angular/fire/firestore';
import { FirestoreService } from './firestore.service';
import {AngularFireModule} from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('FirestoreService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AngularFirestoreModule,AngularFireDatabaseModule],
      providers: [AngularFirestore]
    });
  });

  it('should be created', () => {
    const service: FirestoreService = TestBed.get(FirestoreService);
    expect(service).toBeTruthy();
  });
});
