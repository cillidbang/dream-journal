import { TestBed } from '@angular/core/testing';

import { JournalStorage } from './journal-storage';

describe('JournalStorage', () => {
  let service: JournalStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
