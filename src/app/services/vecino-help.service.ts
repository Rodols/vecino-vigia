import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VecinoIntf } from '../models/VecinoIntf';
import { AlertIntf } from '../models/AlertIntf';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VecinoHelpService {
  private vecinoDoc: AngularFirestoreDocument<VecinoIntf>;
  vecino: Observable<VecinoIntf>;

  private alertCollection: AngularFirestoreCollection<AlertIntf>;
  alerts: Observable<AlertIntf[]>;

  constructor(private afs: AngularFirestore) {
    this.alertCollection = this.afs.collection<AlertIntf>('alerts', ref => ref.orderBy('fecha', 'desc'));
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

  getAllAlerts() {
    this.alerts = this.alertCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as AlertIntf;
        return data;
      }))
    );
  }

  getAlert() {
    this.alertCollection = this.afs.collection<AlertIntf>('alerts', ref => ref.limit(1));
    this.alerts = this.alertCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as AlertIntf;
        return data;
      }))
    );
  }

  Obtenerfecha() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const d = date.getDate();

    let mes = '';
    if (month < 10) {
      mes = '0' + month;
    } else {
      mes = '' + month;
    }

    let dia = '';
    if (d < 10) {
      dia = '0' + d;
    } else {
      dia = '' + d;
    }

    return dia + '-' + mes + '-' + year;
  }

  ObtenerHora() {
    const date = new Date();
    const hr = date.getHours();
    const min = date.getMinutes();

    let minuto = '';
    if (min < 10) {
      minuto = '0' + min;
    } else {
      minuto = '' + min;
    }

    let hora = '';
    if (hr < 10) {
      hora = '0' + hr;
    } else {
      hora = '' + hr;
    }

    return hora + ':' + minuto;
  }

}
