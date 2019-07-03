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
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjIxNDM5MDEsImV4cCI6MTU2MjIzMDMwMSwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImFkbWlubkBhZG1pbi5jb20ifQ.QHlpEFEmreErmitD5d-gTpJHVtSLQZHPQLPYn4nByHDSt7df7-71ATDGfv9EIC3RDlGm__L2o0nJga27EaRave9Y_oipsRsMQozfdnTHYEQ9xvxIbWhBdnNQqlGezAtLGKgbL-esknVsHHUHm5T_0Gdqd98JsUVdEq8Rj_9DM0v7KOccDPIPgN08sxSc6P-XnmDUu5RFbcRvWcHCZMSn6H_E3f7ZQBu8nt5Js6BMtwqVxqrhoJCwWMpygILkpvhb6QLVO1F-o05hcW9-IaemBwE4onFqESRw1loefsRcHgpYnUIG1vbBZrxjPi7xqUJfF-8-qCvihmfhavOsWp10V0SmRo2zpKnV_mntkhWLzx1CAS4KPimcfRcTU9h9wuI47geI_dHC5foRg52JTKhU6P6kaiUk9rh3IUZjrp4texOZ0Eh9KYz6413k4h1A9IvVuPYq02gvDq4cEYvmRZgGUa4BOZeEBME7-BsFT1Ghh9OOSl8bLhxu7zxmPMfPuGa7qp-ns0Zo6PluPf5Nm-6OtyhASr24RPjJMFoTdtLNb8srVCt21pEdDWlGjZhi_Pyn0quMNe83s4PcWc54XgO7pWLD4ekXfy440KKNVPIaRpgsRJYokIVCTRZmdyowdXg8pmmCD60Hi5ldwgTBwBFhx_UY1WXVY2nfIcsM857YKG0';
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
