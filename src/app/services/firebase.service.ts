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
    // 20559129390 ferrimax
    // 20455048592 ferdimax
    return this.firestor.collection("Gmtc_empresa", ref => ref.where('emp_cruc','==','20455048592')).valueChanges({idField:"propertyId"});
  }

  registrarProducto(id:any ,producto:ProductoModel){
    return this.firestor.collection("Gmtc_empresa").doc(id).update({
                //emp_aprod: firestore.firestore.FieldValue.arrayUnion(classToPlain(producto))
                "emp_aprod": firestore.firestore.FieldValue.arrayUnion(classToPlain(producto))
                });
  }

  actualizarEstadoProducto(id:any, producto:ProductoModel){
    /* return this.firestor.collection("Gmtc_empresa").doc(id).update({
      emp_aprod: firestore.firestore.FieldValue.arrayUnion({
        prod_activo: 
      })
    }); */
  }

  arrayVentasVentas(){
    return this.firestor.collection("Gmtc_orden", ref => ref.where('emp_cruc_rec', '==', '20455048592')).valueChanges();
  }

  arrayVentasCotizaciones(){
    return this.firestor.collection("Gmtc_cotizacion", ref => ref.where('emp_cruc_rec', '==', '20455048592')).valueChanges();
  }

  arrayComprasVentas(){
    return this.firestor.collection("Gmtc_orden", ref => ref.where('emp_cruc_emi', '==', '20455048592')).valueChanges();
  }

  arrayComprasCotizaciones(){
    return this.firestor.collection("Gmtc_cotizacion", ref => ref.where('emp_cruc_emi', '==', '20455048592')).valueChanges();
  }

}
