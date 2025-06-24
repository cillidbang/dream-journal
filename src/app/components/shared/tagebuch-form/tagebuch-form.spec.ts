import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagebuchForm } from './tagebuch-form';

describe('TagebuchForm', () => {
  let component: TagebuchForm;
  let fixture: ComponentFixture<TagebuchForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagebuchForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagebuchForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
