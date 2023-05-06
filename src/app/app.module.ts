import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { LoginrComponent } from './rutas/loginr/loginr.component';
import { FormsModule } from '@angular/forms';
import { DashboardARComponent } from './rutas/dashboard-ar/dashboard-ar.component';
import { DashboardCRComponent } from './rutas/dashboard-cr/dashboard-cr.component';
import { DashboardRRComponent } from './rutas/dashboard-rr/dashboard-rr.component';
import { DashboardAComponent } from './componentes/dashboard-a/dashboard-a.component';
import { DashboardCComponent } from './componentes/dashboard-c/dashboard-c.component';
import { DashboardRComponent } from './componentes/dashboard-r/dashboard-r.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular/lib/auth.service';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { SociosComponent } from './rutas/recepcion/socios/socios.component';
import { ProblemasTrComponent } from './rutas/recepcion/problemas-tr/problemas-tr.component';
import { TablasComponent } from './componentes/utilidades/tablas/tablas.component';

export const AUTH0_CLIENT = new InjectionToken('auth0.client');

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    LoginrComponent,
    DashboardARComponent,
    DashboardCRComponent,
    DashboardRRComponent,
    DashboardAComponent,
    DashboardCComponent,
    DashboardRComponent,
    SociosComponent,
    ProblemasTrComponent,
    TablasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [Router],
  bootstrap: [AppComponent]
})
export class AppModule { }
