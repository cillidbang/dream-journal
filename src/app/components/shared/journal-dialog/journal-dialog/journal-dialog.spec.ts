import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalDialog } from './journal-dialog';

describe('JournalDialog', () => {
  let component: JournalDialog;
  let fixture: ComponentFixture<JournalDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
