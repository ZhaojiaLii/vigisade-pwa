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
    // tslint:disable-next-line:max-line-length
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjE0NzM3MDIsImV4cCI6MTU2MTU2MDEwMiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSJ9.OfrnsQoUXW1p1NXWjoL06YjLyhMSGdZUute3dKgDtQQ4QL2299x4Z8oNK5HgVyDz1-fnY5f2UZ3PEQdOLii-IuK82O5A60jWj1QlHc_RGotwPZtsHKI6k26hRdwPBvtsii3nWScgzSMZv5q5l07KfNPFEUrK8BEXc5Zvq3sRpts1uQma39j4lJfEL4-iHAGmiXau4hpnynK1WZeHdwmO_O0_XDlKzCXQgWfytewd4Sky91ILTkCunY86oc3T159FEJ6XuicQnOQKgsaNYnJ5w9txw2xU-gRjV5BBAtxiahP6ZS6-S2mykXAfp1QHTUME09V4Gt0gW_gyPBJTlTZvjJnzA9I1kTMfm-enLivCns6CgRsqXWB28H_XTnbtV17KgSNBsCnPWAVBAPeBpYdl3N9kPKv-0twBqxeC5gEH5QhMeNukWncI0LaKeMiZqiO_lc9hmeoIjh-EGm2OwZBS04AHoJ1COBbVw001whnCFDUQIVezPVmX2H9MIYFKFMRazDlUxGDbIku2vTaaClsqhbOomX_4zNUOZGNis27e5Sai-d84HdMDutBvFHInn2OxmLWPLvpGH2yPzUc054DiATBNQE7DEa5x5YzIhHlE2txSCC89xuzi3EiGmZpuxJVA_C9Jt8wgA4OxMVOI3qGI8rte0ZJ9pY3y3RiPiTzP64M';
    // @todo: get token from the observable.????????????
    const GetToken: Observable<any> = this.loginService.isLogged().pipe(
      filter(isLogged => isLogged),
    );
    const addJWTToken = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    // console.log('new headers', addJWTToken.headers.keys() + ' ' + addJWTToken.headers.get('Authorization'));
    return next.handle(addJWTToken);
  }
}
