import { NgModule } from '@angular/core';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [Router],
  bootstrap: [AppComponent]
})
export class AppModule { }
