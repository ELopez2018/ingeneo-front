import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title!: string;
  @Input() message!: string;
  @Input() modalType: string = 'info';
  @Input() textButtonRigth!: string;
  @Input() textButtonLeft!: string;
  @Input() icon:string='stop';
  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit(): void {
    // This is intentional
  }
  onClick(opcion: string) {
    this.activeModal.close(opcion);
  }
}
