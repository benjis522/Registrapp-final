import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosqrService {

  constructor(private firestore: AngularFirestore) { }

  obtenerDatosRamoSeccion(ramoId: string, seccionId: string): Observable<any> {
    return this.firestore
      .collection('Ramos')
      .doc(ramoId)
      .collection('secciones')
      .doc(seccionId)
      .valueChanges();
  }
}
