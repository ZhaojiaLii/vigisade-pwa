import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { filter, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  /** Detects login success. */

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginService.isLogged().pipe(
      filter(isLogged => isLogged),
      take(1),
      tap(() => this.router.navigate(['home'])),
    ).subscribe();
  }

  login(): void {
    // @todo: get username and passworm from forms.
    this.loginService.login('username', 'password');
    // @todo: add a spinner.
  }
}
