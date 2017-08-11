import { TestBed, inject } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { PlatformMock, SplashScreenMock, NotificationsMock, AppMock, StatusBarMock } from '../../mocks';
import { App, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Notifications } from '../../providers/notifications';

import { AppEffects } from './app.effects';

let instance: AppEffects = null;
let runner: EffectsRunner = null;

describe('App Effects', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      AppEffects,
      { provide: App, useClass: AppMock },
      { provide: Platform, useClass: PlatformMock },
      { provide: SplashScreen, useClass: SplashScreenMock },
      { provide: StatusBar, useClass: StatusBarMock },
      { provide: Notifications, useClass: NotificationsMock }
    ]
  }));

  beforeEach(inject([
      EffectsRunner, AppEffects
    ],
    (_runner, _instance) => {
      runner = _runner;
      instance = _instance;
    }
  ));

  it('is created', () => {
    expect(instance).toBeTruthy();
  });
});
