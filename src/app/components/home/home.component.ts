import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AlertasService } from "../../services/alertas.service";
import { VecinoIntf } from "../../models/VecinoIntf";
import { AlertIntf } from "../../models/AlertIntf";
import { ToastrService } from "ngx-toastr";
import { FcmService } from "../../services/fcm.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  tipoUser = "";
  vecinoDataRef = {} as VecinoIntf;
  ultimaAlerta = {} as AlertIntf;
  fechaDeHoy: any;
  verAlertaDeHoy: boolean;
  tokenList = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertsService: AlertasService,
    private toastr: ToastrService,
    private fcm: FcmService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.ultimaActivacion();
  }

  getCurrentUser() {
    return this.authService.verSession().subscribe(auth => {
      if (auth) {
        this.alertsService.vecinoUser(auth.uid).subscribe(data => {
          this.fcm.getPermission(auth.uid, data.tokenUser);
          this.vecinoDataRef = data;
          this.tipoUser = data.tipo;
          this.vecinoDataRef.tokenUser = this.fcm.tokenList;
        });
      } else {
        this.tipoUser = "";
        this.ultimaAlerta = {};
      }
    });
  }

  help() {
    this.alertsService.addAlert(this.vecinoDataRef);
  }

  ultimaActivacion() {
    this.alertsService.getAlert().subscribe(activada => {
      if (activada[0]) {
        this.ultimaAlerta = activada[0];
        this.verMsgDelDia(this.ultimaAlerta.fecha);
      }
    });
  }

  verMsgDelDia(diaUltimaAlerta) {
    const alertDate = new Date(diaUltimaAlerta);
    const alertFecha =
      alertDate.getDate() +
      "-" +
      (alertDate.getMonth() + 1) +
      "-" +
      alertDate.getFullYear();
    const hoy = new Date();
    const hoyFecha =
      hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
    if (alertFecha === hoyFecha) {
      this.verAlertaDeHoy = true;
      this.toastr.info("Hoy fue activada"
      );
    } else {
      this.verAlertaDeHoy = false;
    }
  }
}
