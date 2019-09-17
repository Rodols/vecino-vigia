import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private isLogged = false;
  private tipoUser = '';
  constructor(private authService: AuthService, private alertService: AlertasService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    return this.authService.verSession().subscribe(auth => {
      if (auth) {
        this.isLogged = true;
        this.alertService.vecinoUser(auth.uid).subscribe(data => {
          this.tipoUser = data.tipo;
        });
      } else {
        this.isLogged = false;
        this.tipoUser = '';
      }
    });
  }

  outLogin() {
    this.authService.cerrarSession();
  }

}
