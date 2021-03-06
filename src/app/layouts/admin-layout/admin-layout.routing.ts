import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { PerfilUsuarioComponent } from '../../perfil-usuario/perfil-usuario.component';
import { ProductosComponent } from '../../productos/productos.component';
import { VentasComponent } from '../../ventas/ventas.component';
import { ComprasComponent } from '../../compras/compras.component';
import { ComprasMiscomprasComponent } from '../../compras-miscompras/compras-miscompras.component';
import { ComprasMiscotizacionesComponent } from '../../compras-miscotizaciones/compras-miscotizaciones.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'mi-perfil',      component: PerfilUsuarioComponent},
    { path: 'productos',      component: ProductosComponent},
    { path: 'ventas',         component: VentasComponent},
    { path: 'compras',         component: ComprasComponent,
        children: [
            {path: 'miscompras',    component: ComprasMiscomprasComponent},
            {path: 'miscotizaciones',   component: ComprasMiscotizacionesComponent},
        ] 
    },
];
