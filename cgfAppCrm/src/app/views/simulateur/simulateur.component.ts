import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-simulateur',
  templateUrl: './simulateur.component.html',
  styleUrls: ['./simulateur.component.scss']
})
export class SimulateurComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ordre={
    "titre":"sonatel",
    "quantite":0,
    "total":0,
    "prix":5075,
    "agent":"autre"
  }
  commissionCgf=0
  commissionBrvm=0
  taf=0
  isAgent=false
  getMontant(even:number){
    
    this.ordre.total = even * this.ordre.prix;
    this.ordre.quantite = even
    this.commissionBrvm =  this.ordre.total * 0.3/100
    this.commissionCgf = this.ordre.total * 1.1 / 100
    this.taf = this.commissionCgf * 17 / 100
    
  }
  onChangeTitre(titre:string){
    if(titre == "sonatel"){
      this.ordre.prix=20000
      
    }
    else if(titre == "total")
      this.ordre.prix=5000

      this.ordre.total = this.ordre.prix * this.ordre.quantite;
  }
  onChangeTypeClient(t){
    if(t == "agent"){

      this.commissionCgf = this.ordre.total * 0.4 / 100
      this.taf = this.commissionCgf * 17 / 100
      this.isAgent = true
    }
    else{
      this.commissionCgf = this.ordre.total * 1.1 / 100
      this.taf = this.commissionCgf * 17 / 100
      this.isAgent = false
    }
    this.ordre.total = this.ordre.prix * this.ordre.quantite;
  }
}
