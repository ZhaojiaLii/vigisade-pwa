import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { filter, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CookieServices } from '../../../services/cookie-services.service';
import { TOKEN_KEY } from '../../../data/auth.const';

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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService,
    private cookie: CookieServices,
  ) {}

  ngOnInit(): void {
    console.log(this.cookie.get('vigisade-tkn'));
    if (this.cookie.get(TOKEN_KEY)) {
      this.loginService.setToken(this.cookie.get('vigisade-tkn'));
    }
    this.loginService.isLogged().pipe(
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

}
