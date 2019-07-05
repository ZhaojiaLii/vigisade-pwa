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
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjIzMTM2NjMsImV4cCI6MTU2MjQwMDA2Mywicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImFkbWluXzBAZ21haWwuY29tIn0.Ylcg1m9TDuKqJ8YCEyIL2y2N2DWaMNf5HIrnTASjHSBIrNdbuZNhk21di5iNHvOB0bg6Gjaw1YcTKSLaRIWfcZPBp2FYQ1yAKorcy2FlLJ1HX1ThGTxMzJk1_iZynddRI5L8xJ9RQv0AtGlIYmmDDkJlf-xGCDCyoKz9XjGyOS4J4mi7vDaiEBi95a5g6bl14qKYYVJpqf7V28J7-zPCSP13vaHD0I1Sd90zIwRSnziwO9eGLV9XorQL0iifDyxhkEfYBvjyI13bB5E-0zVO5VeFoGbUre1nMngMHmgyiX_7Duv5TE6Cqx57uBXexT6F1BMkmsDaE34-76lOnXvsdlZqqT_VfFK98QjFSBsvvmIaxXHcyZBJnTZL8OtNG9Bau7kGTva-WMGi0NrzZuFL20GAvp22VCL7hoP3bQLBPQj1TPRhc39TcF0rtQdCQPc9_m_hEqxkIrQCX6LJvnuQ525HGW6KOo4tlQW67dg2nE9tiA9eHoPybGfY0ZXJThS3WBPDg-9AdvIZ2I1YUddBqQNLiHEwczoMxl6HEQZEBajUoOXYKg70DbVrXSVSmdDzZY64mHwATOwhnD7Z7wwdU_ytTicipV2ylUovJ1kmiuaWZU-IuFKjSWyopVLlWA587BgrgEXSWHiY8cpVnXH75I-Ohc7Ij5Bw2pQ0u-brSqs';
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
