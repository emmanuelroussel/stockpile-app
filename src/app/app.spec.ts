import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

describe('Root Component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      providers: [

      ],
      imports: [
        IonicModule.forRoot(MyApp)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    comp = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('initialises with a root page of TabsPage', () => {
    expect(comp['rootPage']).toBe(LoginPage);
  });
});
