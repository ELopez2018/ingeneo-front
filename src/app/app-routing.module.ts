import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewClientComponent } from './home/new-client/new-client.component';
import { TransportTypeComponent } from './home/transport-type/transport-type.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: "full" },
  {path: 'inicio', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'clientes', component:NewClientComponent},
  {path: 'transporte', component:TransportTypeComponent},
  { path: "**", redirectTo: "page404", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
