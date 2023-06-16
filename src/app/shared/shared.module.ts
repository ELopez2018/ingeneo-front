import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router";
import { NavbarComponent } from './components/navbar/navbar.component'


const Components = [
  NavbarComponent
]
const Modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
]

@NgModule({
  declarations: [...Components],
  imports: [...Modules],
  exports: [...Components, ...Modules]
})
export class SharedModule { }
