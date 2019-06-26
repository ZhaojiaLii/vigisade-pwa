import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { filter, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  /** Detects login success. */
  username = '';
  password = '';
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

  login(username: string, password: string): void {
    // @todo: get username and password from forms.
    this.username = username;
    this.password = password;
    this.loginService.login(this.username, this.password);
    console.log('login with username: ' + this.username + ' ,password: ' + this.password);
    // @todo: add a spinner.
  }
}
