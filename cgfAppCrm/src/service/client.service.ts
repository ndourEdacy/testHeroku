import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients:any[]=[]
  id=0
  url="http://localhost:8080/"
  constructor(private router:Router,private http:HttpClient) { }
  getClient(){
    return this.clients;
  }
  setClient(clients)
  {
    this.clients = clients
  }
  ajoutClient(t){
   
  }
  getIdClient(){
    return this.id;
  }
  setIdCleint(id:number){
    this.id = id
  }
  getAllClient(){
    let url = "http://localhost:8080/clients/get"
    return this.clients
  }
  getPortefeuilleClientByNumcompte(numcpt:number){
    let urpl=this.url+"user/getPortefeuilleByComp?numcpt="+numcpt
    return this.http.get(urpl).pipe(
      map(data=>data)
    )
  }
  getMontantOperationByMonth(numcpt:number){
    let urlp=this.url+"ordre/getMontantOpByMonthByNumcpt?numcpt="+numcpt;
    return this.http.get(urlp)
  }
  getClientById(id:number){
 
    let urlc=this.url+"client/getByCmpt?numcpt="+id

   return this.http.get(urlc)
  }
  modifClient(t){
    
  }
  
  chercherClientByEmail(ch:string){
   
    
   

    return null;
  }

  chercherClientByName(nom:string , prenom:string,dateNaiss:DateConstructor)
  {
 
    return null;
  }

  recherche(cni){
    
      this.detailClient(cni)
    
  }
  detailClient(id){
    // this.client = this.clientService.getClientById(id)
    this.router.navigate(["/detailClient",id])
    
   }
   ratacherTache(idtache:number,idclient:number)
   {
     
     
   }
   getClientByUser(username:string){
     let urlc=this.url+"user/getComptePortefeuille?username="+username
     return this.http.get(urlc).pipe(
       map((data:any[])=>data)
     )
   }
   getclientMou(username:string){
     let urlm = this.url+"ordre/getCompteLiquiditeInactif?username="+username+"&&liquidite=100000"
     return this.http.get(urlm)
   }

   getAllNote(id:number)
   {

     let url1 = this.url+"user/getNoteByCompte?numcpt="+id

     return this.http.get(url1).pipe(
              map((data:any[])=>data)
            )

   }
   addNote(n){
    let url1 = this.url+"user/addNote"
    return this.http.post(url1,n)
   }
   getCouetage(id:number){
     let url1 = this.url+"user/getCourtageCmt?numcpt="+id
     return this.http.get(url1).pipe(
       map((data:number)=>data)
     )
   }
   
   getClientByLiquidite(l1:number,l2:number,user:string){
    let url1 = this.url+"user/getPortefeuillesByLi?l1="+l1+"&&l2="+l2+"&&username="+user
      return this.http.get(url1).pipe(
        map((data:any[])=>data)
      )
     
   }
   detailPortefeuille(numcpt:number){
    let url1 = this.url+"getRelationClientTitreByNumCpt?numcpt="+numcpt
    return this.http.get(url1).pipe(
      map((data:any[])=>data)
    )
   }
}


