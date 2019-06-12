import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminServiceService } from './admin-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommercialService } from 'services/commercial-service';
import { ClientService } from './client.service';
import { PortefeuilleService } from './portefeuille.service';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { LoginComponent } from './login/login.component';

const routes: Route[] = [
  { path: 'login', component : LoginComponent}
];
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(routes),

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
   
    
   

  ],
  providers: [AdminServiceService,CommercialService,ClientService,PortefeuilleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
