import { Injectable } from '@angular/core';
import { Vecino } from '../models/Vecino';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VecinoNuevoService {
  citasCollection: AngularFirestoreCollection<{}>;
  vecino: Observable<{}[]>;
  selectedVecino: Vecino = new Vecino();

  constructor(private afs: AngularFirestore) {
  }

  insertVecino(vecino: Vecino) {
    vecino.tipo = 'user';
    this.afs.collection('vecinos').doc(vecino.idVecino).set(vecino);
  }

}
