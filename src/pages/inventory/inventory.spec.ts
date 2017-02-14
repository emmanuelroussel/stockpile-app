import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';

import { InventoryPage } from './inventory';

let fixture: ComponentFixture<InventoryPage> = null;
let instance: any = null;

describe('Inventory Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([InventoryPage]).then(compiled => {
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
});
