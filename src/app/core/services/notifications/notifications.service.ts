import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/components/modals/modal/modal.component';
interface options {
  titulo?: string;
  mensaje?: string;
  icon?: string;
  textButtonLeft?: string;
  typeModal?: string;
  textButtonRigth?: string;
}
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private ngbModal: NgbModal) { }

  modalOptions: NgbModalOptions = {
    backdrop: 'static',
    backdropClass: 'customBackdrop',
    centered: true,
  };

  public modalRef!: NgbModalRef;

  /**
   *
   *
   * @param {titulo}: string;
   * @param {mensaje}: string;
   * @param {icon}: string;
   * @param {textButtonLeft}: string;
   * @param {typeModal}: string;
   * @param {textButtonRigth}: string;
   * @return {*}  {Promise<any>}
   * @memberof NotificationsService
   *
   */
  public info(options: options): Promise<any> {
    const { titulo = 'afrac', mensaje = '', icon = '', textButtonLeft, textButtonRigth, typeModal } = options
    this.modalRef = this.ngbModal.open(ModalComponent, this.modalOptions);
    this.modalRef.componentInstance.modalType = typeModal;
    this.modalRef.componentInstance.title = titulo.toUpperCase();
    this.modalRef.componentInstance.message = mensaje;
    this.modalRef.componentInstance.icon = icon;
    this.modalRef.componentInstance.textButtonLeft = textButtonLeft;
    this.modalRef.componentInstance.textButtonRigth = textButtonRigth;
    return this.modalRef.result;
  }
  public options(options: options): Promise<any> {
    const { titulo = 'afrac', mensaje = '', icon = '', textButtonLeft, textButtonRigth, typeModal } = options
    this.modalRef = this.ngbModal.open(ModalComponent, this.modalOptions);
    this.modalRef.componentInstance.modalType = typeModal;
    this.modalRef.componentInstance.title = titulo.toUpperCase();
    this.modalRef.componentInstance.message = mensaje;
    this.modalRef.componentInstance.Icon = icon;
    this.modalRef.componentInstance.textButtonLeft = textButtonLeft;
    this.modalRef.componentInstance.textButtonRigth = textButtonRigth;
    return this.modalRef.result;
  }
  public login(options: options): Promise<any> {
    const { titulo = 'afrac', mensaje = '', icon = '', textButtonLeft, textButtonRigth, typeModal } = options
    this.modalRef = this.ngbModal.open(ModalComponent, this.modalOptions);
    this.modalRef.componentInstance.modalType = 'login';
    this.modalRef.componentInstance.title = titulo.toUpperCase();
    this.modalRef.componentInstance.message = mensaje;
    this.modalRef.componentInstance.Icon = icon;
    this.modalRef.componentInstance.textButtonLeft = textButtonLeft;
    this.modalRef.componentInstance.textButtonRigth = textButtonRigth;
    return this.modalRef.result;
  }
  public close() {
    if (this.modalRef) {
      this.modalRef.dismiss();
    }
  }
}
