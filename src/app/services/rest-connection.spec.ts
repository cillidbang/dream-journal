import { TestBed } from '@angular/core/testing';

import { RestConnection } from './rest-connection';

describe('RestConnection', () => {
  let service: RestConnection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestConnection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
