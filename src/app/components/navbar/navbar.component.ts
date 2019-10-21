import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertasService } from '../../services/alertas.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged = false;
  tipoUser = '';
  constructor(private authService: AuthService, private alertService: AlertasService, private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    return this.authService.verSession().subscribe(auth => {
      if (auth) {
        this.isLogged = true;
        this.alertService.vecinoUser(auth.uid).subscribe(data => {
          this.tipoUser = data.tipo;
          this.router.navigate(['home']);
        });
      } else {
        this.router.navigate(['login']);
        this.isLogged = false;
        this.tipoUser = '';
      }
    });
  }

  outLogin() {
    this.authService.cerrarSession();
  }

}
