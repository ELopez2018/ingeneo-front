import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { DeliveryPlanComponent } from './delivery-plan/delivery-plan.component';
import { NewClientComponent } from './new-client/new-client.component';
import { DeliveryPlanFormComponent } from './delivery-plan/delivery-plan-form/delivery-plan-form.component';


@NgModule({
  declarations: [HomeComponent, DeliveryPlanComponent, NewClientComponent, DeliveryPlanFormComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
