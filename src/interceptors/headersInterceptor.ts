import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { apiVersion } from '../constants';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(public storage: Storage) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.fromPromise(this.storage.get('id_token')).flatMap(token =>  {
      const newReq = req.clone({
        setHeaders: {
          'Accept-Version': apiVersion,
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(newReq);
    });
  }
}
