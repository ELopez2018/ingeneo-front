import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: "full" },
  {path: 'inicio', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: "**", redirectTo: "page404", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
