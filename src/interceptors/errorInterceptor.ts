import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorReport } from '../raven-error-handler';
import { UserActions } from '../store/user/user.actions';

let errorReport = new ErrorReport();

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public userActions: UserActions) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch(error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === <number>401) {
          // TODO: Refresh access token and retry request
        }
        // Don't report 404s and 401s because they are a normal behavior of the api most of
        // the time. Ex: user scans item not present in the database or wrong password
        else if (error.status !== <number>404) {
          errorReport.reportError(error);
        }
      }

      return Observable.throw(JSON.parse(error.error));
    });
  }
}
