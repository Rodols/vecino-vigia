import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../../services/alertas.service';
import { AlertIntf } from '../../models/AlertIntf';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-alertas',
  templateUrl: './modal-alertas.component.html',
  styleUrls: ['./modal-alertas.component.css']
})
export class ModalAlertasComponent implements OnInit {
  alertsList: AlertIntf[];

  constructor(private alertsService: AlertasService) {
  }


  getAllAlerts() {
   this.alertsService.getAllAlerts().subscribe(alertas => this.alertsList = alertas);
  }

  ngOnInit() {
    this.getAllAlerts();
  }

}
