import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { VecinoHelpService } from '../../services/vecino-help.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private isLogged = false;
  private tipoUser = '';
  constructor(private authService: AuthService, private vecinoHelp: VecinoHelpService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    return this.authService.verSession().subscribe(auth => {
      if (auth) {
        this.isLogged = true;
        this.vecinoHelp.vecinoUser(auth.uid).subscribe(data => {
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
