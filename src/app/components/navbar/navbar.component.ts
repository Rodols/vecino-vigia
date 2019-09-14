import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private isLogged = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    return this.authService.verSession().subscribe(auth => {
      if (auth) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  outLogin() {
    this.authService.cerrarSession();
  }

}
