import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppEnums } from 'src/app/core/enums/app.enums';
import { IconEnums } from 'src/app/core/enums/icon.enums';
import { IClient } from 'src/app/core/interfaces/client.interface';
import { IMessageApi } from 'src/app/core/interfaces/rmessage-api.interface';
import { TypesTransport } from 'src/app/core/parameters/documents';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';
import { LogisticsService } from '../../../core/services/apis/logistics/logistics.service';

@Component({
  selector: 'app-delivery-plan-form',
  templateUrl: './delivery-plan-form.component.html',
  styleUrls: ['./delivery-plan-form.component.scss']
})
export class DeliveryPlanFormComponent implements OnInit {
  @Input() showForm: boolean = true
  @Input() client: IClient = <IClient>{}
  form: FormGroup = new FormGroup({})
  documentSelectBox = TypesTransport
  control!: AbstractControl | null;
  label: string = ''
  dirty: any
  logisticsType = "Placa del vehículo ";
  formatValid: string = 'AAA123'
  lisencePlate = new FormControl(null, [Validators.pattern(/^([A-Z]{3}[0-9]{3})/gm)]);
  constructor(
    private notificationsService: NotificationsService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private logisticsService: LogisticsService
  ) {
    this.form = this.fb.group({
      typeLogistic: new FormControl(null, [Validators.required]),
      productType: new FormControl(null, [Validators.required]),
      productQty: new FormControl(null, [Validators.required]),
      registerDate: new FormControl(null, [Validators.required]),
      deliveryDate: new FormControl(null, [Validators.required]),
      deliveryWarehouse: new FormControl(null, [Validators.required]),
      shippingPrice: new FormControl(null, [Validators.required]),
      discount: new FormControl('0.00',),
      guideNumber: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      clienId: new FormControl(null,),
      transportId: new FormControl(null, [Validators.required, Validators.pattern(/^([A-Z]{3}[0-9]{3})/gm)]),
    })
  }

  ngOnInit(): void {
    this.form
      .get('typeLogistic')
      ?.valueChanges.subscribe(
        (value) => {
          this.form.get('transportId')?.clearValidators()
          this.form.get('transportId')?.updateValueAndValidity()
          if (value == 'Camiones') {
            this.formatValid = 'AAA123';
            this.logisticsType = "Placa del vehículo";
            this.form.get('transportId')?.addValidators([Validators.required, Validators.pattern(/^([A-Z]{3}[0-9]{3})/gm)])
            this.form.get('transportId')?.updateValueAndValidity()
          } else {
            this.formatValid = 'AAA1234A';
            this.logisticsType = "Número de flota";
            this.form.get('transportId')?.addValidators([Validators.required, Validators.pattern(/^([A-Z]{3}[0-9]{4}[A-Z]{1})/gm)])
            this.form.get('transportId')?.updateValueAndValidity()
          }
        }
      )

    this.form
      .get('shippingPrice')
      ?.valueChanges.subscribe(
        (value) => {
          const values = this.form.value
          let discount = 0;
          if (this.logisticsType == "Placa del vehículo") {
            discount = values.productQty > 10 ? values.shippingPrice * 0.05 : 0
          } else {
            discount = values.productQty > 10 ? values.shippingPrice * 0.03 : 0
          }
          console.log(discount);
          this.form
            .get('discount')?.setValue(discount)

        })
  }

  filtrar() {
  }
  async showModal() {
    const mensaje = 'El Cliente ' + this.form.value.names + ' ha sido registrado.'
    await this.notificationsService.info({ titulo: 'usuarios', mensaje, textButtonLeft: AppEnums.ok, icon: 'ok' });
  }

  async showMessage(data: IMessageApi) {
    const mensaje = data.description
    await this.notificationsService.info({ titulo: data.title ? data.title : "Informacion", mensaje, textButtonLeft: AppEnums.ok, icon: data.icon });
  }
  controlError(controlName: string): string | null {
    if (!this.form || !this.form.get(controlName)) { return '' }
    this.label = controlName;
    this.control = this.form.get(controlName);
    if (this.control) {
      return (this.control.touched && this.control.invalid) ? this.errorText : null
    }
    return ''
  }



  get errorText(): string {
    if (!this.control) { return '' }
    let msg = '';
    this.label = ''
    if (this.control.errors) {
      if (this.control.errors['required']) { msg = `El campo ${this.label} es requerido`; }
      if (this.control.errors['minlength']) { msg = `El campo ${this.label} debe tener minimo ${this.control.errors['minlength'].requiredLength} caracteres`; }
      if (this.control.errors['maxlength']) { msg = `El campo ${this.label} debe tener máximo ${this.control.errors['maxlength'].requiredLength} caracteres`; }
      if (this.control.errors['pattern']) { msg = `El campo ${this.label} debe tener un formato válido ${this.formatValid}`; }
      if (msg == '' && this.control.errors) { msg += `El campo ${this.label} contiene errores.`; }
    }
    return msg;
  }
  async save() {
    if (this.form.invalid) {
      this.form.updateValueAndValidity()
      const mensaje = 'Faltan datos'
      await this.notificationsService.info({ titulo: 'Informacio', mensaje, textButtonLeft: AppEnums.ok, icon: IconEnums.stop });
      return;
    }
    const data = this.form.value
    this.logisticsService.create(data).subscribe(resp => {
      this.notificationsService.info({ titulo: 'Informacio', mensaje: 'El registro fue guardado exitosamente', textButtonLeft: AppEnums.ok, icon: IconEnums.ok });
    }, err => {
      this.notificationsService.info({ titulo: 'Error', mensaje: err.message, textButtonLeft: AppEnums.ok, icon: IconEnums.stop });
    })

  }
  cancel() {
    this.showForm = false
  }
  new() {
    this.showForm = true
  }
  userClicked(user: IClient) {
    this.activeModal.close(user)
  }

}
