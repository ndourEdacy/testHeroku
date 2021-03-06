
import { Map1Component } from './views/maps/map1/map1.component';
import { ModalsComponent } from './views/modals/modals.component';
import { BasicTableComponent } from './views/tables/basic-table/basic-table.component';
import { Profile1Component } from './views/profile/profile1/profile1.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';
import { ClientComponent } from './views/client/client.component';
import { OperationComponent } from './views/operation/operation.component';
import { ProspectComponent } from './views/prospect/prospect.component';
import { NoteComponent } from './views/note/note.component';
import { TacheComponent } from './views/tache/tache.component';
import { SimulateurComponent } from './views/simulateur/simulateur.component';
import { ListeclientComponent } from './views/listeclient/listeclient.component';
import { ListeprospectComponent } from './views/listeprospect/listeprospect.component';
import { DetailClientComponent } from './views/detail-client/detail-client.component';
import { ModifClinetComponent } from './views/modif-clinet/modif-clinet.component';
import { ProfilClientComponent } from './views/profil-client/profil-client.component';
import { LoginComponent } from './views/login/login.component';
import { DetailProspectComponent } from './views/detail-prospect/detail-prospect.component';
import { ListeOperationComponent } from './views/liste-operation/liste-operation.component';
import { NotificationComponent } from './views/notification/notification.component';
import { ProfileClientComponent } from './views/profile-client/profile-client.component';
import { ObjectifComponent } from './views/objectif/objectif.component';
import { Top10portefeuilleComponent } from './views/top10portefeuille/top10portefeuille.component';
import { Top10LiquiditeComponent } from './views/top10-liquidite/top10-liquidite.component';
import { PageNotfoundComponent } from './views/page-notfound/page-notfound.component';
import { ClientNotFoundComponent } from './views/client-not-found/client-not-found.component';





const routes: Route[] = [
  
  
 { path: '', pathMatch: 'full', redirectTo: 'login' },
 { path: 'login', component: LoginComponent },
  { path: 'cgf-crm', children:
    [
      { path: 'admin1/:username', component: Dashboard1Component },
    ]
  },
  { path: 'profiles', children:
    [
      { path: 'profile1', component: Profile1Component },
    ]
  },
  {
     path: 'client', 
     component: ClientComponent
   
  },
  { path: 'maps', children:
    [
      { path: 'map1', component: Map1Component},
    ]
  },
  { path: 'operation', component: OperationComponent},
  { path: 'note', component: NoteComponent},
  { path: 'tache/:id', component: TacheComponent},
  { path: 'prospect', component: ProspectComponent},
  { path: 'modals', component: ModalsComponent},
  { path: 'simulateur', component: SimulateurComponent},
  { path: 'listeClient', component: ListeclientComponent},
  { path: 'listeProspect', component: ListeprospectComponent},
  { path: 'detailClient/:id', component: DetailClientComponent},
  { path: 'detailProspect/:id', component: DetailProspectComponent},
  { path: 'listeProspect', component: ListeprospectComponent},
  { path: 'listeProspect', component: ListeprospectComponent},
  { path: 'listeProspect', component: ListeprospectComponent},
  { path: 'profil/:id', component: ProfilClientComponent},
  { path: 'modifClient/:id', component: ModifClinetComponent},
  { path: 'listeOperation', component: ListeOperationComponent},
  { path: 'notification', component: NotificationComponent},
  { path: 'profileClient/:id', component: ProfileClientComponent},
  { path: 'ojectif', component: ObjectifComponent},
  { path: 'top10portefeuille', component: Top10portefeuilleComponent},
  { path: 'top10liquidite', component: Top10LiquiditeComponent},
  { path: 'clientNotFoundComponent', component: ClientNotFoundComponent},
  { path: '**', component: PageNotfoundComponent }
  
  
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
