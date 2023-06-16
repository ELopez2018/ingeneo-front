import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppEnums } from 'src/app/core/enums/app.enums';
import { IconEnums } from 'src/app/core/enums/icon.enums';
import { IClient } from 'src/app/core/interfaces/client.interface';
import { IMessageApi } from 'src/app/core/interfaces/rmessage-api.interface';
import { TypesTransport } from 'src/app/core/parameters/documents';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';

@Component({
  selector: 'app-delivery-plan-form',
  templateUrl: './delivery-plan-form.component.html',
  styleUrls: ['./delivery-plan-form.component.scss']
})
export class DeliveryPlanFormComponent implements OnInit {
  @Input()  showForm: boolean = true
  form: FormGroup = new FormGroup({})
  documentSelectBox = TypesTransport
  control!: AbstractControl | null;
  label: string = ''
  dirty: any

  logisticsType = "Placa del vehículo ";
  formatValid: string ='AAA123'
  lisencePlate = new FormControl(null, [Validators.pattern(/^([A-Z]{3}[0-9]{3})/gm)]);
  constructor(
    private notificationsService: NotificationsService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      typeLogistic: new FormControl(null, [Validators.required]),
      productType: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      productQty: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      registerDate: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      deliveryDate: new FormControl(null),
      deliveryWarehouse: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      shippingPrice: new FormControl(null,),
      guideNumber: new FormControl(null,),
      clienId: new FormControl(null,),
      transportId: new FormControl(null,[Validators.required, Validators.pattern(/^([A-Z]{3}[0-9]{3})/gm)]),
    })
  }

  ngOnInit(): void {
    this.form
    .get('typeLogistic')
    ?.valueChanges.subscribe(
      (value) => {
        this.form.get('transportId')?.clearValidators()
        this.form.get('transportId')?.updateValueAndValidity()
        if(value == 'Camiones'){
          this.formatValid ='AAA123';
          this.logisticsType = "Placa del vehículo";
          this.form.get('transportId')?.addValidators([Validators.required, Validators.pattern(/^([A-Z]{3}[0-9]{3})/gm)])
          this.form.get('transportId')?.updateValueAndValidity()
        } else {
          this.formatValid ='AAA1234A';
          this.logisticsType = "Número de flota";
          this.form.get('transportId')?.addValidators([Validators.required, Validators.pattern(/^([A-Z]{3}[0-9]{4}[A-Z]{1})/gm)])
          this.form.get('transportId')?.updateValueAndValidity()
        }
      }
    )
  }

  filtrar() {
  }
  showModal() {
    const mensaje = 'El Cliente ' + this.form.value.names + ' ha sido registrado.'
    this.notificationsService.info({ titulo: 'usuarios', mensaje, textButtonLeft: AppEnums.ok, icon: 'ok' });
  }

  showMessage(data: IMessageApi) {
    const mensaje = data.description
    this.notificationsService.info({ titulo: data.title ? data.title : "Informacion", mensaje, textButtonLeft: AppEnums.ok, icon: data.icon });
  }
  controlError(controlName: string): string | null {
    if (!this.form || !this.form.get(controlName)) { return '' }
    this.label = controlName;
    this.control = this.form.get(controlName);
    if (this.control) {
      return (this.control.touched && this.control.invalid ) ? this.errorText : null
    }
    return ''
  }



  get errorText(): string {
    if (!this.control) { return '' }
    let msg = '';
    this.label = ''
    if (this.control.errors) {
      if (this.control.errors['required']) { msg = `El campo ${this.label} es requerido`; }
      if (msg == '' && this.control.errors['minlength']) { msg = `El campo ${this.label} debe tener minimo ${this.control.errors['minlength'].requiredLength} caracteres`; }
      if (msg == '' && this.control.errors['maxlength']) { msg = `El campo ${this.label} debe tener máximo ${this.control.errors['maxlength'].requiredLength} caracteres`; }
      if (msg == '' && this.control.errors['max']) { msg = `El campo ${this.label} debe ser un año menor a ${this.control.errors['max'].max}`; }
      if (msg == '' && this.control.errors['min']) { msg = `El campo ${this.label} debe ser un año mayor a ${this.control.errors['min'].min}`; }
      if (msg == '' && this.control.errors['email']) { msg = `El campo ${this.label} debe tener un formato válido de correo electrónico`; }
      if (msg == '' && this.control.errors['pattern']) { msg = `El campo ${this.label} debe tener un formato válido ${this.formatValid}`; }
      if (msg == '' && this.control.errors) { msg = `El campo ${this.label} contiene errores.`; }
    }
    return msg;
  }
  save() {
    if (this.form.invalid) {
      this.form.updateValueAndValidity()
      const mensaje = 'Faltan datos'
      this.notificationsService.info({ titulo: 'clientes', mensaje, textButtonLeft: AppEnums.ok, icon: IconEnums.stop });
      return;
    }
    const data = this.form.value

    console.log(data);
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
