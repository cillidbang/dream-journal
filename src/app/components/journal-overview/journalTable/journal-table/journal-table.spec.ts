import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalTable } from './journal-table';

describe('JournalTable', () => {
  let component: JournalTable;
  let fixture: ComponentFixture<JournalTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
