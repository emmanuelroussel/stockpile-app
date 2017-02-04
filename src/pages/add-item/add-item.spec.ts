import { ComponentFixture, async } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { TestUtils } from '../../test';
import { AddItemPage } from './add-item';

let fixture: ComponentFixture<AddItemPage> = null;
let instance: any = null;

describe('Add Item Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([AddItemPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    spyOn(instance.navParams, 'get');
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('gets navParam tag', () => {
    expect(instance.tag).toEqual('tag');
  });

  it('initializes with \'Good\' as condition default value', () => {
    expect(instance.item.condition).toEqual('Good');
  });

  it('calls onSave() on click on save button', () => {
    spyOn(instance, 'onSave');
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0], 'click');
    expect(instance.onSave).toHaveBeenCalled();
  });
});
