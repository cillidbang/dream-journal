import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalOverview } from './journal-overview.component';

describe('LandingPage', () => {
  let component: JournalOverview;
  let fixture: ComponentFixture<JournalOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
