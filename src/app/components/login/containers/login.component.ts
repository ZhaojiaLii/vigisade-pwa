import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginService.isLogged().pipe(
      filter(isLogged => isLogged),
      take(1),
    ).subscribe(() => this.router.navigate(['home']));
  }

  login(username: string, password: string): void {
    this.loginService.login(username, password);
    console.log('LoginComponent.login', username, password);
    // @todo: add a spinner.
  }
}
