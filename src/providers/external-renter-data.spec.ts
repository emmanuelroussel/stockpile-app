import { ExternalRenterData } from './external-renter-data';
import { TestData } from '../test-data';
import { ApiMock } from '../mocks';

let instance: ExternalRenterData = null;

describe('ExternalRenterData Provider', () => {

  beforeEach(() => {
    instance = new ExternalRenterData((<any> new ApiMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('calls api to get external renters', () => {
    instance.api.value = TestData.externalRenters.results;
    instance.getExternalRenters().subscribe(
      res => expect(res).toEqual(TestData.externalRenters.results),
      err => fail(err)
    );
  });

  it('calls api to create external renter', () => {
    instance.api.value = TestData.response;
    instance.createExternalRenter(TestData.externalRenter.name).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to update external renter', () => {
    instance.api.value = TestData.response;
    instance.updateExternalRenter(TestData.externalRenter, TestData.externalRenter.externalRenterID).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to delete external renter', () => {
    instance.api.value = TestData.response;
    instance.deleteExternalRenter(TestData.externalRenter.externalRenterID).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });
});
