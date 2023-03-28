import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginrComponent } from './rutas/loginr/loginr.component';

const routes: Routes = [
    {path:'', redirectTo:'loginr', pathMatch:'full'},
    {path:'loginr', component:LoginrComponent,}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginrComponent];