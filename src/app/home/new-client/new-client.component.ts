import { Component, OnInit, Output, EventEmitter } from "@angular/core"
import { FormGroup, AbstractControl, FormBuilder, FormControl, Validators } from "@angular/forms"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { Subscription } from "rxjs"
import { AppEnums } from "src/app/core/enums/app.enums"
import { IconEnums } from "src/app/core/enums/icon.enums"
import { IClient } from "src/app/core/interfaces/client.interface"
import { IMessageApi } from "src/app/core/interfaces/rmessage-api.interface"
import { ISession } from "src/app/core/interfaces/sesion.interface"
import { Documents } from "src/app/core/parameters/documents"
import { NotificationsService } from "src/app/core/services/notifications/notifications.service"


@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  @Output() userSelected = new EventEmitter<IClient>()
  form: FormGroup = new FormGroup({})
  showForm: boolean = false
  documentSelectBox = Documents
  subs: Subscription = new Subscription();
  clientList: IClient[] = [];
  control!: AbstractControl | null;
  label: string = ''
  dirty: any
  userSession!: ISession;
  constructor(
    private notificationsService: NotificationsService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      documentType: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      names: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastNames: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      address: new FormControl(null),
      cellphone: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      email: new FormControl(null,),
      nickname: new FormControl(null,),
      password: new FormControl(null,),
    })
  }

  ngOnInit(): void {
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
      return (this.control.touched && this.control.invalid) ? this.errorText : null
    }
    return ''
  }
  get validation() {
    if (this.control) {
      return (this.control.dirty && this.control.valid)
    }
    return null;
  }

  get validateEmail() {
    return this.form.get('email')?.invalid
  }
  get validateIdentification() {
    return this.form.get('name')?.invalid || this.form.get('phone')?.invalid || this.form.get('dni')?.invalid || this.form.get('terms')?.invalid
  }

  get validateAddress() {
    return this.form.get('state')?.invalid || this.form.get('city')?.invalid || this.form.get('address')?.invalid
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
      if (msg == '' && this.control.errors) { msg = `El campo ${this.label} contiene errores.`; }
    }
    return msg;
  }
  save() {
    if (this.form.invalid) {
      const mensaje = 'Faltan datos'
      this.notificationsService.info({ titulo: 'clientes', mensaje, textButtonLeft: AppEnums.ok, icon: IconEnums.stop });
      return;
    }
    const data = this.form.value
    data.nickname = data.documentNumber
    data.password = data.documentNumber

  }
  cancel() {
    this.showForm = false
  }
  new() {
    this.showForm = true
  }
  userClicked(user: IClient) {
    this.userSelected.emit(user)
    this.activeModal.close(user)
  }
}
