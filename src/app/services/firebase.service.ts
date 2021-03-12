import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { classToPlain } from 'class-transformer';
import { ProductoModel } from '../models/producto';
import firestore  from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestor: AngularFirestore
  ) { }

  consultarUser(){
    return this.firestor.collection("Gmtc_empresa", ref => ref.where('emp_cruc','==','20559129390')).valueChanges({idField:"propertyId"});
  }

  registrarProducto(id:any ,producto:ProductoModel){
    return this.firestor.collection("Gmtc_empresa").doc(id).update({
                //emp_aprod: firestore.firestore.FieldValue.arrayUnion(classToPlain(producto))
                "emp_aprod": firestore.firestore.FieldValue.arrayUnion(classToPlain(producto))
                });
  }
}
