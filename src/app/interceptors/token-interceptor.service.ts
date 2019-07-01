import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../store/app.state';
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
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjE5Njg5MDEsImV4cCI6MTU2MjA1NTMwMSwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImFkbWlubkBhZG1pbi5jb20ifQ.EYmm1w0tTZ2Kn0k_Nzg0B97my3Ji3dyl9rTsnVC1vVjT0j8Qfos2sEwcFz6WFoaHHQS7KMhAdmCFyqV6OWlifR_33nqS7vn3SLhr8qw7o937Dh1uo567yhllQtG94nhuxUkP9JdoWKk8kGRU1udnuXwOaZCrPvrrZA5e1copoZINCExeZjM2cfrUoHGbwf9acnCc8Zp4P3DrRTPZ8d8Skm_k1sinbUGzUm_zhMpsLcy5xUMPAKsSEjeUx9PaDtic0M5Nsvc5kGDK5FOGnvckUWpVgYbIG3p_dx9MOJdMqY_j2bGnK_QAJv0JUh1fn0em8pb1iNgguQ5CTS1h1ICLaVf5QNVwJmQhXoePnT1vMX3X9wG8m59SCbcxmWXidWeeizeHE7cFS7oSAFpYKP0zjxX37QOIh0c3K3egb2qbo-s6agEGrxOwZcm1hsM2oiu3n9TLM5BU70S7ie8ZtpJ-Ici6FG-IRWuPVSsS40mCsJJ8T21Vhc2hKb3qjCtFaURs6kt1rNNtdAo3dJgrzfvR-0aXZ8CC1Ns_S4iRN8LKuaSAQuW9LV3UPvfuQim8ew-KgHkMY_Mu7fE_WSm0xYmWrdUYZxi9kAZqH3O7T5V91-ir_G5EqETInVhR-0BhNctn5wS1ydpsRUdC34rxjYB0TF4nIOBmpf0qzR5ts1vA5iw';
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
