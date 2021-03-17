import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { VentasComponent } from './ventas/ventas.component';
/*import { ComprasMiscomprasComponent } from './compras-miscompras/compras-miscompras.component';
import { ComprasMiscotizacionesComponent } from './compras-miscotizaciones/compras-miscotizaciones.component';
import { ComprasComponent } from './compras/compras.component';*/


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    VentasComponent,
    /*ComprasMiscomprasComponent,
    ComprasMiscotizacionesComponent,
    ComprasComponent,*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
