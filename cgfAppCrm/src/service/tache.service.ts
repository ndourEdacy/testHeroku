import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class TacheService {
 taches:any=[];
 tache={
  id:0,
  dateDebut:Date,
  dateFin:Date,
  description:"",
  sujet:"",
  statut:"active",
  priorite:"medium",
  dateCreate:"2018-10-23",
  numclientRatacher:0,
  assignerA:"",
  userCreat:""
}
 id=0;
 url="http://localhost:8080/"
  constructor(private http:HttpClient, private loginservice :LoginService) { 
    this.url = loginservice.url; 
  }
  ajouterTache(t){
     let urlt = this.url+"tache/add"
     return this.http.post(urlt,t).pipe(
       map((data:any)=>data)
     )
     
  }
  getAllTache(username){
    let url1=this.url+"user/getTacheByCommercial?username="+username
    return this.http.get(url1).pipe(
      map((data:any[])=>data)
    )
  }

  getTacheById(id:number){
   
    let urlt = this.url+"tache/findById/"+id
     
    return this.http.get(urlt).pipe(
      map((data:any)=>data)
    );
    
  }
  modifierTache(t){
    let urlt = this.url+"tache/updateTache";


    // for(let i = 0 ; i < this.taches.length ; i++){
    //   if(this.taches[i].id === t.id){
    //      this.tache[i]=t;
        
    //        this.tache[i]
    //   }
    // }

    return this.http.put(urlt,t);
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
  getTacheByNumCpt(numcpt:number){
    let urlt=this.url+"tache/getTacheByNumCompte?numcpt="+numcpt;
    return this.http.get(urlt).pipe(
      map((data:any[])=>data)
    )
  }
}
