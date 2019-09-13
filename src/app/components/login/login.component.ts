import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  public isError = false;

  constructor(private autService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.autService.inicioSession(this.user.correo, this.user.pass)
        .then((res) => {
          this.router.navigate(['home']);
          this.isError = false;
        }).catch(err => {
          this.onIsError();
        });
    } else {
      this.onIsError();
    }
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}
