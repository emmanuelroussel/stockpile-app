import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Needs to pass the error as a string because the error interceptor parses it
// to json
const errorMessage = `{"message": "Request timeout. Check your internet connection"}`;

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).timeoutWith(
      70,
      Observable.throw({ error: errorMessage })
    );
  }
}
