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
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjIzMTQxMTAsImV4cCI6MTU2MjQwMDUxMCwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImFkbWluXzFAZ21haWwuY29tIn0.a2BV3D9jtizJJSuSF7nuHLmOi7NPJ_0OCIWFRfFr-dJ08WoflyHBJP9QKbznFjCNM-Tr0K43fIxg_Z6b244xWAQSXBlwOCVTdJrHwBY3qsYzpHhVMT5y1Mq1Chz_uJocB-GJBJhbm4ElkiDz_INiKvzxpEk2y_ptmwaVFbuSiCtSdCMIWloUa0B2MlfKoaonT88eV5KxGFgg2gg0Kzx07FBzXxuwWY6lrTHPreMDXeEtf4lTrJy71bHJAi57feOVKPtW5v1R3fhdMkvC7QKfo7qbwVO6cvnaayIwef56lXEixHSFYI9EMX5Aj1nBuPnvFzDb0Fxj_XIJDkAk9AuaK_PQhdMK5_ou1hHBfFUs5lURQlfaNh5-vMH3NSq1bPIg6nSVAPl2H1aJkVY8Y7GRqGtllFz-XAcLSLNIioz_KI-uVUw3S1tGw3Fv4n9tdfzIya68h79wKAxX_IaKBBiezws_h90P0mUQ8GU5Zny0CndD7Tkqjo0FWH4WQ24G3IHqqsibkJUtwRFlmvcMf1JQ7fuPui92QdT7UQB6VcHTKUtyyRpCtOsQQaZIQ3xTLl1SfOY66UxLX48YBVfO-tib58hFocTKBu8zHTn1Lkopk6lzaf4FtJUn3xW-Q53d2-BT8J3xXuAM6vgKNWBDUvQynZehG9C71MXADel7DXJbORQ';
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
