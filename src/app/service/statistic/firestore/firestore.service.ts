import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  //
  public getViews(branchId) {
    const docRef = this.firestore.collection(`2095d570-8cb6-4522-ab9d-3b68732f69f1/JUNE-2020/${branchId}/`);
    return docRef.snapshotChanges();
  }
}
