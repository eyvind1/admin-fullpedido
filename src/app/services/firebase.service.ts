import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  consultarUser(){
    return this.firestore.collection("Gmtc_empresa", ref => ref.where('emp_cruc','==','20559129390')).valueChanges();
  }
}
