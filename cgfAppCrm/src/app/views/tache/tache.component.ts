import { Component, OnInit, OnDestroy } from '@angular/core';
import { TacheService } from 'service/tache.service';
import { Tache } from 'models/tache';
import { LoginService } from 'service/login.service';
import { ClientService } from 'service/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlerteService } from 'service/alerte.service';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit,OnDestroy {
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
  }
  users:any
  id=0
  numcli=0
  taches:any[] = [];
  username
    constructor(private tacheService:TacheService,private loginservice:LoginService,private clientservice:ClientService,private router:ActivatedRoute,private route:Router,private alerteService:AlerteService) {

      loginservice.getAllUser().subscribe(data=>{
          this.users = data;
      })
      
      router.params.forEach(param=>{
        this.id = param.id
       });
       clientservice.getClientById( this.id).subscribe(
           data=>{
               this.tache.numclientRatacher = data['numCompt'];
               this.numcli = data['cptNoCli'];
            },
            error=>{
               console.log(error)
            },
            ()=>{
               console.log('fin')
            }
            )
   }

  ngOnInit() {
   this.username = sessionStorage.getItem("username")
      
   if(this.username == undefined)
     this.route.navigate(["login"])
  }
  ngOnDestroy() {
   // ...
   }
   ajouterTache(){
      
        this.tache.userCreat = this.loginservice.getUserName();

        this.tacheService.ajouterTache(this.tache).subscribe(data=>{
         this.alerteService.showSuccess('Tache ajouté avec succés')
             if(data!=null)
             this.route.navigate(["profileClient/", this.numcli])
        })
    
   }

   getTaches(){
      this.tacheService.getAllTache(this.loginservice.getUserName()).subscribe(data=>{
          this.taches = data;
      });
   }
}
