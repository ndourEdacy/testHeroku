import { Injectable } from '@angular/core';
import { Prospect } from 'models/prospect';

@Injectable({
  providedIn: 'root'
})
export class ProspectService {
 private prospects=[{
   id:0,
   nom:"sow",
   prenom:"yacine",
   dateNaiss:"1999-12-12",
   email:"ndourbaila@gmail.com",
   telephone:"770926272"
 },
 {
  id:2,
  nom:"sy",
  prenom:"mouhamadou",
  dateNaiss:"1999-12-12",
  email:"ndourbaila@gmail.com",
  telephone:"770926272"
},
{
  id:3,
  nom:"ndiaye",
  prenom:"djiby",
  dateNaiss:"1999-12-12",
  email:"ndourbaila@gmail.com",
  telephone:"770926272"
},
{
  id:4,
  nom:"sow",
  prenom:"amadou",
  dateNaiss:"1999-12-12",
  email:"ndourbaila@gmail.com",
  telephone:"770926272"
},
{
  id:5,
  nom:"ba",
  prenom:"ramata",
  dateNaiss:"1999-12-12",
  email:"ndourbaila@gmail.com",
  telephone:"770926272"
}]
  constructor() { }
  getAllProspect()
  {
    return this.prospects;
  }
  getProspectById(id:number){
    
    for(let i =0 ; i < this.prospects.length ; i++){
         if(this.prospects[i].id == id)
          return this.prospects[i]
    }
    return null
  }
}
