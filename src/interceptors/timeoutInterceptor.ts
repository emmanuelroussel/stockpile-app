import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Needs to pass the error as a string because the error interceptor parses it
// to json
const errorMessage = `{"message": "Request timeout. Check your internet connection"}`;

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Timeout all requests after 7 seconds
    return next.handle(req).timeoutWith(
      7000,
      Observable.throw({ error: errorMessage })
    );
  }
}
