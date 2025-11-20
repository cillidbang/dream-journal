import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageToaster } from './message-toaster';

describe('MessageToaster', () => {
  let component: MessageToaster;
  let fixture: ComponentFixture<MessageToaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageToaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageToaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
