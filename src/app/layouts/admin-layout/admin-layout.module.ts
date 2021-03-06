import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ProductosComponent } from '../../productos/productos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatInputModule } from '@angular/material/input';
import { ComponentsModule } from '../../components/components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { PerfilUsuarioComponent } from '../../perfil-usuario/perfil-usuario.component';
import { VentasComponent } from '../../ventas/ventas.component';
import { ComprasComponent } from '../../compras/compras.component';
import { ComprasMiscomprasComponent } from '../../compras-miscompras/compras-miscompras.component';
import { ComprasMiscotizacionesComponent } from '../../compras-miscotizaciones/compras-miscotizaciones.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(), 
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatInputModule,
    ComponentsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    ProductosComponent,
    PerfilUsuarioComponent,
    VentasComponent,
    ComprasComponent,
    ComprasMiscomprasComponent,
    ComprasMiscotizacionesComponent,
  ]
})

export class AdminLayoutModule {
  
  
}
