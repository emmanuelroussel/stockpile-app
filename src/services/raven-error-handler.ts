import { IonicErrorHandler, Platform } from 'ionic-angular';
import * as Raven from 'raven-js';

Raven
  .config('https://a64af160cb8746709c9743f23f666b9b@sentry.io/150943')
  .install();

export class ErrorReport {
  platform: Platform = new Platform();

  reportError(err: any): void {
    if (this.platform.is('cordova')) {
      Raven.captureException(err.originalError || err);
    }
  }
}

export class RavenErrorHandler extends IonicErrorHandler {
  platform: Platform = new Platform();
  errorReport: ErrorReport = new ErrorReport();

  handleError(err: any): void {
    super.handleError(err);
    this.errorReport.reportError(err);
  }
}
