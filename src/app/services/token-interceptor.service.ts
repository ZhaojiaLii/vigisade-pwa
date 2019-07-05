import { Injectable } from '@angular/core';
import { HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoginService } from '../components/login/services/login.service';
import 'rxjs-compat/add/operator/mergeMap';
import 'rxjs-compat/add/operator/catch';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    return this.loginService.getToken().pipe(
      switchMap((token: string) => {

        const host = window.location.protocol + '//' + window.location.host;
        console.log('host', host, req.url);

        return next.handle(
          req.clone({
            url: host + req.url,
            headers: req.headers.set('Authorization', `Bearer ${token}`),
          })
        );
      })
    );
  }
}
