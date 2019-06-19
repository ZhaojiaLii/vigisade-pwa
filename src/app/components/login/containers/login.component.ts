import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  /** Detects login success. */
  isLogged$ = this.loginService.isLogged().pipe(
    take(1),
    tap(() => console.log('LOGIN SUCCESS'))
  );

  constructor(
    private loginService: LoginService,
  ) { }

  login(): void {
    this.loginService.login('username', 'password');
  }
}
