import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorReport } from '../raven-error-handler';

let errorReport = new ErrorReport();

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch(error => {
      if (error instanceof HttpErrorResponse) {
        // Don't report 404s and 401s because they are a normal behavior of the api most of
        // the time. Ex: user scans item not present in the database or wrong password
        if (error.status !== <number>404 || error.status !== <number>401) {
          errorReport.reportError(error);
        }
      }

      return Observable.throw(JSON.parse(error.error));
    });
  }
}
