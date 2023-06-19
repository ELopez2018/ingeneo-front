import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent {
  @Input() message = "El usuario no fue encontrado."
  @Input() title = "USUARIOS"
  @Input() labelbtnLeft!: string;
  @Input() labelbtnRigth!: string;
  @Input() icon: string ='stop';
  @Output() events = new EventEmitter<string>()

  onClick(action: string) {
    this.events.emit(action)
  }
}
