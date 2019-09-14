import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VecinoIntf } from '../models/VecinoIntf';
import { AlertIntf } from '../models/AlertIntf';

@Injectable({
  providedIn: 'root'
})
export class VecinoHelpService {
  private vecinoDoc: AngularFirestoreDocument<VecinoIntf>;
  vecino: Observable<VecinoIntf>;

  private alertsCollection: AngularFirestoreCollection<AlertIntf>;
  alerts: Observable<AlertIntf[]>;

  constructor(private afs: AngularFirestore) {
    this.alertsCollection = afs.collection<AlertIntf>('alerts');
    this.alerts = this.alertsCollection.valueChanges();
  }

  vecinoUser(id) {
    this.vecinoDoc = this.afs.doc<VecinoIntf>('vecinos/' + id);
    this.vecino = this.vecinoDoc.valueChanges();
    return this.vecino;
  }

  addAlert(alert: AlertIntf) {
    this.alertsCollection.add(alert);
  }
}
