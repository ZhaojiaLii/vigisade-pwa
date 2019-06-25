import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../store/app.state';
import { LoginService } from '../components/login/services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = '';
    // @todo: get token from the observable.????????????
    const GetToken: Observable<any> = this.loginService.isLogged().pipe(
      filter(isLogged => isLogged),
    );
    const addJWTToken = req.clone({
      // headers: req.headers.set('Content-Type', 'application/json'),
    });
    // console.log('new headers', addJWTToken.headers.keys());
    return next.handle(addJWTToken);
  }
}
