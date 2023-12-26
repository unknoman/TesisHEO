import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardARComponent } from './rutas/dashboard-ar/dashboard-ar.component';
import { DashboardCRComponent } from './rutas/dashboard-cr/dashboard-cr.component';
import { DashboardRRComponent } from './rutas/dashboard-rr/dashboard-rr.component';
import { LoginrComponent } from './rutas/loginr/loginr.component';
import { AuthguardGuard } from './guards/authguard.guard';
import { ProblemasTrComponent } from './rutas/recepcion/problemas-tr/problemas-tr.component';
import { SociosComponent } from './rutas/recepcion/socios/socios.component';
import { PlanesrComponent } from './rutas/cobranzas/planesr/planesr.component';
import { TecnicosrComponent } from './rutas/cobranzas/tecnicosr/tecnicosr.component';
import { UsuariosComponent } from './rutas/usuarios/usuarios/usuarios.component';
import { EstadisticasCcComponent } from './rutas/estadisticas-cc/estadisticas-cc.component';

const routes: Routes = [
    {path:'', redirectTo:'loginr', pathMatch:'full'},
    {path:'loginr', component:LoginrComponent},
    {path:'dashboardar', component:DashboardARComponent, canActivate: [AuthguardGuard]},
    {path:'dashboardcr', component:DashboardCRComponent, canActivate: [AuthguardGuard]},
    {path:'dashboardrr', component:DashboardRRComponent, canActivate: [AuthguardGuard]},
    {path:'problemastr', component:ProblemasTrComponent, canActivate: [AuthguardGuard]},
    {path:'sociosr', component:SociosComponent, canActivate: [AuthguardGuard]},
    {path:'planesr', component:PlanesrComponent, canActivate: [AuthguardGuard]},
    {path:'tecnicosr', component:TecnicosrComponent, canActivate: [AuthguardGuard]},
    {path:'usuariosr', component:UsuariosComponent, canActivate: [AuthguardGuard]},
    {path:'estadisticasc', component:EstadisticasCcComponent, canActivate: [AuthguardGuard]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginrComponent, DashboardARComponent, DashboardCRComponent, ProblemasTrComponent, SociosComponent, PlanesrComponent, TecnicosrComponent];