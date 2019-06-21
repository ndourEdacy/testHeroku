import { Component, OnInit } from '@angular/core';
import { TitreService } from 'service/titre.service';
import { CoursService, Cours } from 'service/cours.service';
import { Titre } from 'service/client.service';


@Component({
  selector: 'app-simulateur',
  templateUrl: './simulateur.component.html',
  styleUrls: ['./simulateur.component.scss']
})
export class SimulateurComponent implements OnInit {
  ordre={
    "titre":"SNTS",
    "quantite":0,
    "total":0,
    "prix":5075,
    "agent":"autre"
  }
  commissionCgf=0
  commissionBrvm=0
  taf=0
  isAgent=false
  titres: any[] = [];
  prixcour=0;
 coursDuJours:any[]=[];
 cours:any[]=[];

  constructor(private titreService: TitreService,private courservice: CoursService) { 
    
    this.getAllCour();
    

  }

  async getAllCour(){
   
    await this.courservice.getAllcourDuJour().then((data:Cours[])=>{
       this.cours = data;
      
    });

    await this.courservice.getAlltitre().then((data:Titre[])=>{
      this.titres = data;
     
    });

    for(let i =0 ; i < this.cours.length ; i++)
    {
       for(let j = 0 ; j < this.titres.length ; j++)
       {
          if( this.cours[i].codeTitre.trim() == this.titres[j].codeTitre.trim())
          {
            let cour={
              codeTitre:String,
              nomTitre:String,
              prixDujour:0
            };
             cour.codeTitre = this.cours[i].codeTitre.trim();
             cour.nomTitre = this.titres[j].nomTitre.trim();
             cour.prixDujour = this.cours[i].prix;

             this.coursDuJours.push(cour);
          }
       }
    }
    this.prixcour = this.getCourByCodetitre("SNTS").prixDujour;
    
  }



  ngOnInit() {
  }
  
  getMontant(even:number){
    
    this.ordre.total = even *  this.prixcour;
    this.ordre.quantite = even
    this.commissionBrvm =  this.ordre.total * 0.3/100
    this.commissionCgf = this.ordre.total * 1.1 / 100
    this.taf = this.commissionCgf * 17 / 100
    
  }


  async onChangeTitre(titre:string) {
    let cour = await this.getCourByCodetitre(titre);
   
    this.prixcour = cour.prixDujour;
    

      this.ordre.total = this.prixcour  * this.ordre.quantite;
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
    this.ordre.total =  this.prixcour * this.ordre.quantite;
  }

  getCourByCodetitre(codeTitre:string){
   
    for(let j = 0 ; j < this.coursDuJours.length ; j++){
        if(codeTitre.trim() == this.coursDuJours[j].codeTitre.trim()){
         
          return this.coursDuJours[j];
       }
       
    }
      return null;
  }
}
