import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { DeliveryPlanComponent } from './delivery-plan/delivery-plan.component';


@NgModule({
  declarations: [HomeComponent, DeliveryPlanComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
