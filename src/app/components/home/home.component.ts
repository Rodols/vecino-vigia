import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { VecinoHelpService } from '../../services/vecino-help.service';
import { VecinoIntf } from '../../models/VecinoIntf';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private modalVecino = '';
  private vecinoDataRef = {} as VecinoIntf;

  constructor(
    private authService: AuthService,
    private router: Router,
    private vecinoHelp: VecinoHelpService) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    return this.authService.verSession().subscribe(auth => {
      if (auth) {
        this.vecinoHelp.vecinoUser(auth.uid).subscribe(data => {
          this.vecinoDataRef = data;
          this.modalVecino = data.tipo;
        });
      } else {
        this.router.navigate(['login']);
        this.modalVecino = '';
      }
    });
  }

  help() {
    this.vecinoHelp.addAlert(this.vecinoDataRef);
  }

}
