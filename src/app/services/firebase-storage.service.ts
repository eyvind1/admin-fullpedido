import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  /** Tarea para subir archivo */
  public taskCloudStorage(nombreArchivo: string, datos:any){
    return this.storage.upload(nombreArchivo,datos);
  }

  /** Referencia del archivo */
  public referenceCloudStorage(nombreArchivo:string){
    return this.storage.ref(nombreArchivo);
  }
}
