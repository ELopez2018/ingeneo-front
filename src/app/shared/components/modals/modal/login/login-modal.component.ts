import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICredentials } from '@interfaces/credentials.interface';
import { AuthService } from '../../../../../core/services/apis/auth/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {
  @Input() message = "El usuario no fue encontrado."
  @Input() title = "USUARIOS"
  @Input() labelbtnLeft!: string;
  @Input() labelbtnRigth!: string;
  @Input() icon: string ='stop';
  @Output() events = new EventEmitter<string>()
  @Output() data = new EventEmitter<ICredentials>()
  form: FormGroup;
  control!: AbstractControl | null;
  label: string = ''
  dirty: any
constructor(private fb: FormBuilder,
  private authService:AuthService,
  private router: Router
  ){
  this.form = this.fb.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  })
}
  onClick(action: string) {
    if(this.form.invalid){
      return
    }
    const credencials: ICredentials = this.form.value;
    this.data.emit(credencials);
    this.authService.login(credencials).subscribe(response =>{
      this.router.navigate(['/sistema/inicio']);
      this.events.emit('close')

    })
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
      if (msg == '' && this.control.errors['minlength']) { msg = `El campo ${this.label} debe tener minimo ${this.control.errors['minlength'].requiredLength} caracteres`; }
      if (msg == '' && this.control.errors['maxlength']) { msg = `El campo ${this.label} debe tener máximo ${this.control.errors['maxlength'].requiredLength} caracteres`; }
      if (msg == '' && this.control.errors['max']) { msg = `El campo ${this.label} debe ser un año menor a ${this.control.errors['max'].max}`; }
      if (msg == '' && this.control.errors['min']) { msg = `El campo ${this.label} debe ser un año mayor a ${this.control.errors['min'].min}`; }
      if (msg == '' && this.control.errors['email']) { msg = `El campo ${this.label} debe tener un formato válido de correo electrónico`; }
      if (msg == '' && this.control.errors) { msg = `El campo ${this.label} contiene errores.`; }
    }
    return msg;
  }
}
