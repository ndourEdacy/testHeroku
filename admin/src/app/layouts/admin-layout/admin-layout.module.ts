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
import { ProfilCommercialComponent } from 'app/profil-commercial/profil-commercial.component';
import { RapportComponent } from 'app/rapport/rapport.component';
import { ObjectifComponent } from 'app/objectif/objectif.component';
import { VueGlobaleDuMoiComponent } from 'app/vue-globale-du-moi/vue-globale-du-moi.component';
import { Top10LiquiditeComponent } from 'app/top10-liquidite/top10-liquidite.component';
import { Top10PortefeuilleComponent } from 'app/top10-portefeuille/top10-portefeuille.component';
import { DetailClientComponent } from 'app/detail-client/detail-client.component';


@NgModule({
  imports: [
    
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    ProfilCommercialComponent,
    RapportComponent,
    ObjectifComponent,
    VueGlobaleDuMoiComponent,
    Top10LiquiditeComponent,
    Top10PortefeuilleComponent,
    DetailClientComponent,
    
  ]
})

export class AdminLayoutModule {}
