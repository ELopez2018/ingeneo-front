import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router";
import { NavbarComponent } from './components/navbar/navbar.component'
import { MaterialModule } from './material.module';
import { ModalComponent } from "./components/modals/modal/modal.component";
import { ModalInfoComponent } from "./components/modals/modal/modal-info/modal-info.component";

const Components = [
  NavbarComponent,
  ModalComponent,
  ModalInfoComponent
]
const Modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  MaterialModule
]

@NgModule({
  declarations: [...Components],
  imports: [...Modules],
  exports: [...Components, ...Modules]
})
export class SharedModule { }
