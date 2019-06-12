import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ProfilCommercialComponent } from 'app/profil-commercial/profil-commercial.component';
import { RapportComponent } from 'app/rapport/rapport.component';
import { ObjectifComponent } from 'app/objectif/objectif.component';
import { VueGlobaleDuMoiComponent } from 'app/vue-globale-du-moi/vue-globale-du-moi.component';
import { Top10LiquiditeComponent } from 'app/top10-liquidite/top10-liquidite.component';
import { Top10PortefeuilleComponent } from 'app/top10-portefeuille/top10-portefeuille.component';
import { DetailClientComponent } from 'app/detail-client/detail-client.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'rapport',           component: RapportComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'objectif',  component: ObjectifComponent },
    { path: 'top10liquidite',  component: Top10LiquiditeComponent },
    { path: 'top10portefeuille',  component: Top10PortefeuilleComponent },
    { path: 'detailclient/:id',  component: DetailClientComponent },
    {
        path: 'commercial/:id',
        component: ProfilCommercialComponent
    },
 
    {
      path: 'vuedumois',
      component: VueGlobaleDuMoiComponent
    }
];
