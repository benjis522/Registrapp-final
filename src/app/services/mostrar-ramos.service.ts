import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collection } from 'firebase/firestore';
import { doc } from '@angular/fire/firestore';
import { collectionData, getFirestore } from '@angular/fire/firestore';
import {AngularFirestore} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class MostrarRamosService {

  constructor() { }
  firestore = inject(AngularFirestore);

  getRamos(): Observable<any[]> {
    
    const ramosCollectionRef = collection(getFirestore(), 'Ramos');
    return collectionData(ramosCollectionRef, { idField: 'id' });
  }

  getSeccionesByRamo(ramoId: string): Observable<any[]> {
    const seccionesCollectionRef = collection(getFirestore(), `Ramos/${ramoId}/secciones`);
    return collectionData(seccionesCollectionRef, { idField: 'id' });
  }

  
}
