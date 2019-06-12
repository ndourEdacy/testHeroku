import { Injectable } from '@angular/core';
import { Tache } from 'models/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
 taches:any=[{
  id:1,
  dateDebut:"2018-10-26",
  dateFin:"2018-10-27",
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique nunc ut leo placerat, eu ultricies risus fringilla. Phasellus suscipit eget odio ut semper. Integer tempus finibus lacinia. Cras id scelerisque nibh. Curabitur risus erat, dignissim ut imperdiet in, efficitur vitae metus. Mauris vestibulum velit vel rutrum dignissim. In id vulputate velit, ut auctor est. Pellentesque tempus urna a consectetur dictum. Aenean vitae placerat felis.",
  sujet:"achat titre",
  statut:"active",
  priorite:"medium",
  dateCreate:"2018-10-23"
},{
  id:2,
  dateDebut:"2018-10-26",
  dateFin:"2018-10-26",
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique nunc ut leo placerat, eu ultricies risus fringilla. Phasellus suscipit eget odio ut semper. Integer tempus finibus lacinia. Cras id scelerisque nibh. Curabitur risus erat, dignissim ut imperdiet in, efficitur vitae metus. Mauris vestibulum velit vel rutrum dignissim. In id vulputate velit, ut auctor est. Pellentesque tempus urna a consectetur dictum. Aenean vitae placerat felis.",
  sujet:"vente titre",
  statut:"active",
  priorite:"medium",
  dateCreate:"2018-10-25"
},{
  id:3,
  dateDebut:"2018-10-26",
  dateFin:"2018-10-26",
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique nunc ut leo placerat, eu ultricies risus fringilla. Phasellus suscipit eget odio ut semper. Integer tempus finibus lacinia. Cras id scelerisque nibh. Curabitur risus erat, dignissim ut imperdiet in, efficitur vitae metus. Mauris vestibulum velit vel rutrum dignissim. In id vulputate velit, ut auctor est. Pellentesque tempus urna a consectetur dictum. Aenean vitae placerat felis.",
  sujet:"phoning",
  statut:"active",
  priorite:"medium",
  dateCreate:"2018-10-11"
},{
  id:4,
  dateDebut:"2018-10-26",
  dateFin:"2018-10-26",
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique nunc ut leo placerat, eu ultricies risus fringilla. Phasellus suscipit eget odio ut semper. Integer tempus finibus lacinia. Cras id scelerisque nibh. Curabitur risus erat, dignissim ut imperdiet in, efficitur vitae metus. Mauris vestibulum velit vel rutrum dignissim. In id vulputate velit, ut auctor est. Pellentesque tempus urna a consectetur dictum. Aenean vitae placerat felis.",
  sujet:"mailling",
  statut:"active",
  priorite:"medium",
  dateCreate:"2018-11-02"
},{
  id:5,
  dateDebut:"2018-10-26",
  dateFin:"2018-10-26",
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique nunc ut leo placerat, eu ultricies risus fringilla. Phasellus suscipit eget odio ut semper. Integer tempus finibus lacinia. Cras id scelerisque nibh. Curabitur risus erat, dignissim ut imperdiet in, efficitur vitae metus. Mauris vestibulum velit vel rutrum dignissim. In id vulputate velit, ut auctor est. Pellentesque tempus urna a consectetur dictum. Aenean vitae placerat felis.",
  sujet:"f yhry",
  statut:"active",
  priorite:"medium",
  dateCreate:"2018-10-21"
}];
 tache={
  id:0,
  dateDebut:Date,
  dateFin:Date,
  description:"",
  sujet:"",
  statut:"active",
  priorite:"medium",
  dateCreate:"2018-10-23"
}
 id=0;
  constructor() { }
  ajouterTache(t){
    t.id=this.id+1;
    this.id++;
    
     this.taches.push(t);
  }
  getAllTache(){
    return this.taches
  }

  getTacheById(id:number){
   
      // this.taches.forEach(function(element) {
      //   console.log(element.id)
      //    if(element.id === id){
      //      this.tache=element
      //    }
        
      // });
      for(let i = 0 ; i < this.taches.length ; i++){
          if(this.taches[i].id === id){
           return this.taches[i];
          }
      }
     
        return this.tache;
    
  }
  modifierTache(t){
    
    for(let i = 0 ; i < this.taches.length ; i++){
      if(this.taches[i].id === t.id){
         this.tache[i]=t;
        
         return  this.tache[i]
      }
    }
  }

  getTache(date){

    let t=[]
    for(let i =0 ; i < this.taches.length ; i++)
    {
       if(this.taches[i].dateDebut == date)
       {
         t.push(this.taches[i])
       }
    }
    return t;

  }
}
