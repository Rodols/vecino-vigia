import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AlertIntf } from "../models/AlertIntf";
import { VecinoIntf } from "../models/VecinoIntf";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class AlertasService {
  private alertCollection: AngularFirestoreCollection<AlertIntf>;
  private alertsCollection: AngularFirestoreCollection<AlertIntf>;
  private tokensCollection: AngularFirestoreCollection<VecinoIntf>;
  private tokens: Observable<VecinoIntf[]>;
  private alerts: Observable<AlertIntf[]>;
  private alert: Observable<AlertIntf[]>;

  private vecinoDoc: AngularFirestoreDocument<VecinoIntf>;
  vecino: Observable<VecinoIntf>;

  constructor(private afs: AngularFirestore, private toastr: ToastrService) {
    this.alertCollection = afs.collection<AlertIntf>("alerts", ref =>
      ref.orderBy("fecha", "desc").limit(1)
    );
    this.alertsCollection = afs.collection<AlertIntf>("alerts", ref =>
      ref.orderBy("fecha", "desc")
    );
    this.tokensCollection = afs.collection<VecinoIntf>("vecinos");
  }

  vecinoUser(id) {
    this.vecinoDoc = this.afs.doc<VecinoIntf>("vecinos/" + id);
    this.vecino = this.vecinoDoc.valueChanges();
    return this.vecino;
  }

  getTokens(): Observable<VecinoIntf[]> {
    this.tokens = this.tokensCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as VecinoIntf;
          return data;
        })
      )
    );
    return this.tokens;
  }

  addAlert(nuevaAlerta: AlertIntf) {
    nuevaAlerta.fecha = new Date().getTime();
    this.afs
      .collection("alerts")
      .add(nuevaAlerta)
      .then(() => {
          this.toastr.success("Alerta Activada");
        });
  }

  getAllAlerts(): Observable<AlertIntf[]> {
    this.alerts = this.alertsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as AlertIntf;
          return data;
        })
      )
    );
    return this.alerts;
  }

  getAlert(): Observable<AlertIntf[]> {
    this.alert = this.alertCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as AlertIntf;
          return data;
        })
      )
    );
    return this.alert;
  }

  updateTokenUser(idVecino, token) {
    this.afs
      .collection("vecinos")
      .doc(idVecino)
      .update({ tokenUser: token });
  }
}
