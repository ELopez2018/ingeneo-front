import { Component, OnInit } from '@angular/core';
import { NewClientComponent } from '../new-client/new-client.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';
import { IClient } from 'src/app/core/interfaces/client.interface';

@Component({
  selector: 'app-delivery-plan',
  templateUrl: './delivery-plan.component.html',
  styleUrls: ['./delivery-plan.component.scss']
})
export class DeliveryPlanComponent implements OnInit {
  nameClien!: string;
  client!: IClient;
  form: FormGroup = new FormGroup({})
  constructor(
    private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private router: Router,
    private ngbModal: NgbModal,

  ) {
  }
  ngOnInit(): void {

  }
  async seletcClient() {
    await this.ngbModal.open(NewClientComponent, {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: true,
      fullscreen: true
    }).result
      .then(result => {
        console.log(result);
        this.client = result
        this.nameClien = this.client.names
      })
  }
}
