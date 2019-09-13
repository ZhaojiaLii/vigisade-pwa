import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { filter, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  ) {}

  ngOnInit(): void {
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

  login(username: string, password: string, localConnection: boolean): void {
    if (username && password) {
      if (localConnection) {
        this.loginService.login(username, password, true);
      } else {
        this.loginService.googleLogin(username, password, false);
      }
    } else {
      this.toastrService.error('Formulaire incomplet');
    }
  }

  checkState() {
    // @ts-ignore
    this.checkbox = document.querySelector('#localConnection').checked;
  }
}
