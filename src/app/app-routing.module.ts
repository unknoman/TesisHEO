import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardARComponent } from './rutas/dashboard-ar/dashboard-ar.component';
import { DashboardCRComponent } from './rutas/dashboard-cr/dashboard-cr.component';
import { DashboardRRComponent } from './rutas/dashboard-rr/dashboard-rr.component';
import { LoginrComponent } from './rutas/loginr/loginr.component';
import { AuthguardGuard } from './guards/authguard.guard';

const routes: Routes = [
    {path:'', redirectTo:'loginr', pathMatch:'full'},
    {path:'loginr', component:LoginrComponent},
    {path:'dashboardar', component:DashboardARComponent, canActivate: [AuthguardGuard]},
    {path:'dashboardcr', component:DashboardCRComponent, canActivate: [AuthguardGuard]},
    {path:'dashboardrr', component:DashboardRRComponent, canActivate: [AuthguardGuard]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginrComponent, DashboardARComponent, DashboardCRComponent];