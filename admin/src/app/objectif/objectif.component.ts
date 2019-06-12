import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.scss']
})
export class ObjectifComponent implements OnInit {
  courtage=0;
  nombreOrdre=0;
  montantVente=0;
  montantAchat=0;
  montantSubscrip=0;
  nombreCompte=0;
  
  constructor() { }

  ngOnInit() {
  }
  getMontantAchat(even:number){
    this.courtage+=even*1.1/100;  
    if(even ==0)
    this.courtage = 0;
  }
  
}
