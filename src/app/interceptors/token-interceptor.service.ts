import { Injectable } from '@angular/core';
import { HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoginService } from '../components/login/services/login.service';
import 'rxjs-compat/add/operator/mergeMap';
import 'rxjs-compat/add/operator/catch';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    // tslint:disable-next-line:max-line-length
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjI1NzMzODMsImV4cCI6MTU2MjY1OTc4Mywicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImFkbWluXzFAZ21haWwuY29tIn0.LITTFQy70Ylln5f07XiJyvehkGdl7Rb_DHBneNEd0N5HlLNCjIl5DaZPt4R407Rb2UXbuGfaOjDhXljSNt9e0GmkJa1LDDHKZqNXOaqooPWgJgBNV96V0njMof_dq0ftZcEFjSYs4I6_qbTugCztXjvQOeo0iEzBqaYUt6hClJZJl-cPtHifiX6TRc3TLh3Iw52grtG2mMaqJtnYy3o6Te1CaRCib1U0oIIr0V11w23GG0Nf3pKGKfFI_swqYWdQM18dXQ5xvJP_A6KLk8ab7x30klyUSwuMxxNY1tkc0KiQqtVuTmuVwyjvxd1apEF6nOzQVc-FUFYOGkyyJ2CSvP91kuE3nxUGu6Ew6aZNqpj6DJsghrxF5ddXtJbqJnHJxgXg9uIpLLGRFp33XUc2nhwFHV_J1H1wm8QkxGgha0QqJ37eFimOJ_y15wSaDhVeRA0TjDxFOCLAfHWJEdRppd2jNLg4tq88cEjYoBJwi6zJ0EglwlJnuPGBIwOAyxyn5iaWauW_U1OE43e8_UaCnS86XbK5osszyxI5NSxNOulzi5Su_AuZ4X2El6FYDLDNfg1xVR0CSggq7TXS_xyf4JcIAAMHLE7l3wpwziKC0d22fTZTsoJt6cBRZ4FbjdNHSdVhyN-uEc7ahA8h4BKCK5_lKKbWafBfUEX8QMUW-F0';
    // @todo: get token from the observable.
    const GetToken: Observable<any> = this.loginService.isLogged().pipe(
      filter(isLogged => isLogged),
    );
    const addJWTToken = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    // console.log('new headers', addJWTToken.headers.keys() + ' ' + addJWTToken.headers.get('Authorization'));
    return next.handle(addJWTToken);
    //     .flatMap((event: any) => {
    //   if (event instanceof HttpResponse && event.body.code !== 200) {
    //     return Observable.create(observer => observer.error(event));
    //   }
    //   return Observable.create(observer => observer.next(event));
    // });
  }
}
