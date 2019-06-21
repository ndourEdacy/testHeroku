import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'service/login.service';

import { NotificationService } from 'service/notification.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from 'service/client.service';
import { client } from '../listeclient/listeclient.component';
import { TacheService } from 'service/tache.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit , OnDestroy{
  clients:client[]=[];
  alertes:any[]=[];
  taches:any[]=[];
  username:string
  montant=3000000
  tache={
    
    dateDebut:Date,
    dateFin:Date,
    descriptionTache:"",
    sujet:"",
    statut:"active",
    priorite:"medium",
    numclientRatacher:0,
    assignerA:"",
    userCreat:""
 };
 users: any
 idtache=0;
  constructor(private loginService:LoginService,private notificationservice:NotificationService,private router:Router, private tacheService: TacheService,
              private spinner: NgxSpinnerService,private clientService:ClientService) {
    
    //this.username = this.loginService.getUserName();
   

   }

  ngOnInit() {
    this.username = sessionStorage.getItem("username")
    this.notificationservice.setisVisiteNotification(true);
   
      if(this.username == undefined)
        this.router.navigate(["login"])
        
        this.notificationservice.getTacheAfaire(this.username).subscribe(data=>{
           this.taches = data;
        });

      this.notificationservice.getAlerteDuJour(this.username).subscribe(data=>{
        this.alertes = data;
      });

      
      this.spinner.show();
      this.notificationservice.getClientPotentiel(this.username,this.montant).subscribe(data=>{
        this.clients = data;
        this.getportefeuilleClients();
        this.spinner.hide();
      });
  }

  ngOnDestroy() {
    // ...
  }
  detailClient(numcpt){
    this.router.navigate(["/profileClient",numcpt])
  }
  getportefeuilleClients(){
      if(this.clients != null){
        for(let i = 0 ; i < this.clients.length ; i++){
          this.clientService.getPortefeuilleClientByNumcompte(this.clients[i].numCompt).subscribe(data=>{
            this.clients[i].portefeuille = data[1];
            this.clients[i].liquidite = data[0];
          })        
        }
    }
  }

  modifTache(){
    this.tacheService.ajouterTache(this.tache).subscribe( (value) => {
           console.log(value)
          },
          (error) => {
            console.log('Uh-oh, an error occurred! : ' + error);
          },
          () => {
            console.log('Observable complete!');
          }
   );
    
  }

  async getIdTache(id){
    this.tacheService.getTacheById(id).subscribe(data=>{
     
        this.tache = data
    });
  }

}
