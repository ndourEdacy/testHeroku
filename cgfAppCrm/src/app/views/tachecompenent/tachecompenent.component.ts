import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'service/notification.service';
import { LoginService } from 'service/login.service';
import { TacheService } from 'service/tache.service';

@Component({
  selector: 'app-tachecompenent',
  templateUrl: './tachecompenent.component.html',
  styleUrls: ['./tachecompenent.component.scss']
})
export class TachecompenentComponent implements OnInit {
  
 @Input() idTache:number;

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
 users:any;
  constructor(private tacheService:TacheService) { }

  ngOnInit() {
    this.tacheService.getTacheById(this.idTache).subscribe(data=>{
      console.log(this.idTache)
        this.tache = data
    });
  }
  modifTache(){

  }
}
