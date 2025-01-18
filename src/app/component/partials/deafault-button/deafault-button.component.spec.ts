import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeafaultButtonComponent } from './deafault-button.component';

describe('DeafaultButtonComponent', () => {
  let component: DeafaultButtonComponent;
  let fixture: ComponentFixture<DeafaultButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeafaultButtonComponent]
    });
    fixture = TestBed.createComponent(DeafaultButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
