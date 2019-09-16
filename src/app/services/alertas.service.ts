import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertIntf } from '../models/AlertIntf';
import { VecinoIntf } from '../models/VecinoIntf';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  private alertCollection: AngularFirestoreCollection<AlertIntf>;
  private alertsCollection: AngularFirestoreCollection<AlertIntf>;
  private alerts: Observable<AlertIntf[]>;
  private alert: Observable<AlertIntf[]>;

  private vecinoDoc: AngularFirestoreDocument<VecinoIntf>;
  vecino: Observable<VecinoIntf>;

  constructor(private afs: AngularFirestore, ) {
    this.alertCollection = afs.collection<AlertIntf>('alerts', ref => ref.orderBy('fecha', 'desc').limit(1));
    this.alertsCollection = afs.collection<AlertIntf>('alerts', ref => ref.orderBy('fecha', 'desc'));
  }

  vecinoUser(id) {
    this.vecinoDoc = this.afs.doc<VecinoIntf>('vecinos/' + id);
    this.vecino = this.vecinoDoc.valueChanges();
    return this.vecino;
  }

  addAlert(alert: AlertIntf) {
    alert.fecha = (new Date()).getTime();
    this.alertCollection.add(alert);
  }


  getAllAlerts(): Observable<AlertIntf[]> {
    this.alerts = this.alertsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as AlertIntf;
        return data;
      }))
    );
    return this.alerts;
  }

  getAlert(): Observable<AlertIntf[]> {
    this.alert = this.alertCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as AlertIntf;
        return data;
      }))
    );
    return this.alert;
  }

}
