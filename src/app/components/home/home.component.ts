import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertasService } from '../../services/alertas.service';
import { VecinoIntf } from '../../models/VecinoIntf';
import { AlertIntf } from '../../models/AlertIntf';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private tipoUser = '';
  private vecinoDataRef = {} as VecinoIntf;
  public ultimaAlerta = {} as AlertIntf;
  public fechaDeHoy: any;

  constructor(
    private authService: AuthService, private router: Router,
    private alertsService: AlertasService) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.ultimaActivacion();
  }

  getCurrentUser() {
    return this.authService.verSession().subscribe(auth => {
      if (auth) {
        this.alertsService.vecinoUser(auth.uid).subscribe(data => {
          this.vecinoDataRef = data;
          this.tipoUser = data.tipo;
        });
      } else {
        this.router.navigate(['login']);
        this.tipoUser = '';
        this.ultimaAlerta = {};
      }
    });
  }

  help() {
    this.alertsService.addAlert(this.vecinoDataRef);
  }

  ultimaActivacion() {
    this.alertsService.getAlert().subscribe(activada => {
      this.ultimaAlerta = activada[0];
    });
  }

}
