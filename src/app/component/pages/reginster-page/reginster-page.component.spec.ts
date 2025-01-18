import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReginsterPageComponent } from './reginster-page.component';

describe('ReginsterPageComponent', () => {
  let component: ReginsterPageComponent;
  let fixture: ComponentFixture<ReginsterPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReginsterPageComponent]
    });
    fixture = TestBed.createComponent(ReginsterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
