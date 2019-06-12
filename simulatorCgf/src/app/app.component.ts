import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ordre={
    "titre":"",
    "quantite":0,
    "total":0,
    "prix":20000
  }
  commissionCgf=0
  commissionBrvm=0
  taf=0
  getMontant(even:number){
    
    this.ordre.total = even * this.ordre.prix;
    this.ordre.quantite = even
    this.commissionBrvm =  this.ordre.total * 0.3/100
    this.commissionCgf = this.ordre.total * 1.1 / 100
    this.taf = this.commissionCgf * 17 / 100
    
  }
  onChangeTitre(titre:string){
    if(titre == "sonatel"){
      this.ordre.prix=1300
      
    }
    else if(titre == "total")
      this.ordre.prix=5000

      this.ordre.total = this.ordre.prix * this.ordre.quantite;
  }
  
}
