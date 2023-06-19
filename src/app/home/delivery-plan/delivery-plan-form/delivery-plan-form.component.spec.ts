import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPlanFormComponent } from './delivery-plan-form.component';

describe('DeliveryPlanFormComponent', () => {
  let component: DeliveryPlanFormComponent;
  let fixture: ComponentFixture<DeliveryPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryPlanFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
