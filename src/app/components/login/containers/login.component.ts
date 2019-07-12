import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { filter, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  // @todo: on changes:
  //   - check if the token is available and OK
  //   - redirect if necessary,

  spinnerEnable = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginService.isLogged().pipe(
      filter(isLogged => isLogged),
      take(1),
      tap(() => this.spinnerEnable = false),
    ).subscribe(() => this.router.navigate(['home']));
  }

  login(username: string, password: string): void {
    this.loginService.login(username, password);
    this.spinnerEnable = true;
  }
}
