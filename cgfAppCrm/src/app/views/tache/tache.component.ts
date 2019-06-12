import { Component, OnInit } from '@angular/core';
import { TacheService } from 'service/tache.service';
import { Tache } from 'models/tache';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {
  tache={
     id:0,
     dateDebut:Date,
     dateFin:Date,
     description:"",
     sujet:"",
     statut:"active",
     priorite:"medium",
  }
  constructor(private tacheService:TacheService) { }

  ngOnInit() {
  }
   ajouterTache(){
     this.tacheService.ajouterTache(this.tache)
    
     console.log(this.tacheService.getTacheById(this.tache.id))
   }

   getTaches(){
     return this.tacheService.getAllTache();
   }
}
