import { ComponentFixture, async } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { TestUtils } from '../../test';
import { AddItemPage } from '../add-item/add-item';
import { HomePage } from './home';

let fixture: ComponentFixture<HomePage> = null;
let instance: any = null;

describe('Home Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([HomePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('initializes with a segment of Rent', () => {
    expect(instance.segment).toEqual('Rent');
  });

  it('calls onNext() on click', () => {
    spyOn(instance, 'onNext');
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0], 'click');
    expect(instance.onNext).toHaveBeenCalled();
  });

  it('calls this.navCtrl.push when onNext() is called and pass on tag in NavParams', async(() => {
    instance.segment = 'Add';
    instance.value.tag = 'banana';
    spyOn(instance.navCtrl, 'push');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
      instance.onNext(form);
      expect(instance.navCtrl.push).toHaveBeenCalledWith(AddItemPage, {tag: 'banana'});
    });
  }));
});
