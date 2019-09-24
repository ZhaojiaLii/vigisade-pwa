import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { filter, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  // @todo: on changes:
  //   - check if the token is available and OK
  //   - redirect if necessary,

  spinnerEnable$: Observable<boolean> = this.loginService.getSpinnerEnable();

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    localConnection: new FormControl(''),
  });

  checkbox: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.cookieService.deleteAll();
    this.loginService.isLogged().pipe(
      filter(isLogged => isLogged),
      take(1),
      tap(() => {}),
    ).subscribe(() => this.router.navigate(['home']));

    this.loginService.isGoogleAccount().pipe(
      filter(isLogged => isLogged),
      take(1),
      tap(() => {}),
    ).subscribe(() => this.router.navigate(['home']));
  }

  login(username: string, password: string): void {
    if (username && password) {
      this.loginService.login(username, password);
    } else {
      this.toastrService.error('Formulaire incomplet');
    }
  }

  loginGoogle() {
    this.toastrService.error('Google login not ready');
  }
}
