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
  tokenList= [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertsService: AlertasService,
    private toastr: ToastrService,
    private fcm: FcmService
  ) {}

  ngOnInit() {
    this.getTokens();
    this.getCurrentUser();
    this.ultimaActivacion();
  }

  getTokens(){
    this.alertsService.getTokens().subscribe(tokensVecinos => {
      tokensVecinos.forEach((tokenVecino, index:number)=>
        {
          if(this.vecinoDataRef.tokenUser !== tokenVecino.tokenUser){
            this.tokenList[index] = tokenVecino.tokenUser;
          }
        });
    });
  }

  getCurrentUser() {
    return this.authService.verSession().subscribe(auth => {
      if (auth) {
        this.alertsService.vecinoUser(auth.uid).subscribe(data => {
          this.vecinoDataRef = data;
          this.tipoUser = data.tipo;
          this.fcm.getPermission(auth.uid, data.tokenUser);
        });
      } else {
        this.router.navigate(["login"]);
        this.tipoUser = "";
        this.ultimaAlerta = {};
      }
    });
  }

  help() {
    this.vecinoDataRef.tokenUser = this.tokenList;
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
      this.toastr.info(
        "Hoy fue activada la alarma revisa tus alertas",
        "Alerta del Día"
      );
    } else {
      this.verAlertaDeHoy = false;
    }
  }
}
