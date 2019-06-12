
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { client } from './top10-liquidite/top10-liquidite.component';
import { AdminServiceService } from './admin-service.service';

export class Titre{
   idRrelation:string
   numCompte:number
   quantite:number
   codeTitre:string
   cmp:number
   prixDuJour:number
   montant:number
   nomTitre:string
}
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients:any[]=[]
  titres:Titre[]=null
  id=0
  url = ''
  constructor(private router: Router, private http: HttpClient , private adminService: AdminServiceService) {
    this.url = adminService.getUrl();
  }

  getClients(data:any[]){
    let cts:client[]=[];
    for(let i = 0 ; i < data.length ; i++){
            
      this.getClientByNumCpt(data[i].numCompt).subscribe(res=>{
          
            cts[i] = res;
            cts[i].username = data[i].usernameCommercial;
            cts[i].portefeuille = data[i].portefeuille;
            cts[i].liquidite = data[i].liquidite;
           
            console.log( data[i].usernameCommercial)
        });
      
    }
    return cts;

  }

  getTitre(){
    return this.titres;
  }

  setTitre(t:any[]){
     this.titres=t;
  }


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
    let urpl=this.url+"getPortefeuilleClient/"+numcpt
    return this.http.get(urpl).pipe(
      map((data:any)=>data)
    )
  }
  getMontantOperationByMonth(numcpt:number,date){
    let urlp=this.url+"ordre/getMontantOpByMonthByNumcpt/"+date+"?numcpt="+numcpt;
    return this.http.get(urlp)
  }
  getClientById(id:number){
 
    let urlc=this.url+"client?id="+id

    return this.http.get(urlc).pipe(
      map((data:any)=>data)
    )
  }
  getClientByNumCpt(id:number){
 
    let urlc=this.url+"/client/getByCmpt?numcpt="+id

    return this.http.get(urlc).pipe(
      map((data:any)=>data)
    )
  }
  modifClient(t){
    
  }
  
  chercherClientByEmail(ch:string){
    return null;
  }

  chercherClientByName(nom:string)
  {
    let urlc=this.url+"clients/getClientByName?nom="+nom;

    return this.http.get(urlc).pipe(
               map((data:any[])=>data)
            );
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
     let urlc=this.url+"client/getClientBYUserAffect?username="+username
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
   detailPortefeuille(numcpt:number)
   {

      let url1 = this.url+"getRelationClientTitreByNumCpt?numcpt="+numcpt

      return this.http.get(url1).pipe(
            map((data:Titre[])=>data)
      );

    }

   getProfilClient(num:number){
     let urlp=this.url+"clients/getsClient?numcpt="+num
     return this.http.get(urlp).pipe(
       map((data:any[])=>data)
     )
   }
   getPortefeuillesByClient(num:number){
     let urlp = this.url+"portefeuille/getPortefeuillesClient?numcpt="+num;
     return this.http.get(urlp).pipe(
       map((data:any[])=>data)
     )
   }

   getNomTitre(codeTitre:string) :string {
    let nom=""

    //  for(let i = 0 ;i < this.titres.length ; i++){
      
    //     if( this.titres[i].codeTitre.trim() == codeTitre){
    //       nom= this.titres[i].nomTitre;
         
    //       return nom;
    //     }
          
    //  }
     return nom;
   }

   getOperationByMontant(montantinf:number , montantsup:number){
     
   }

   public getTheLastOperationByNumCompte(numCpt:number){
    let url1=this.url+"ordre/getTheLastOrdrePassedByNumCpt?numclient="+numCpt;
    return this.http.get(url1).pipe(
      map((data:any[])=>data)
    )
  }
  public savePhonning(phonning){
    let urlp = this.url+"phoning/savePhonning";
    return this.http.post(urlp,phonning);
  }
  public getStatistiqueByDateByNumcompteByTypeTransanction(date:string , numcompte:number){
    let urls = this.url+"getStatistiqueByDateByNumcompteByTypeTransanction/"+date+"?numcompte="+numcompte;

    return this.http.get(urls).pipe(
      map((data:number[])=>data)
    )
  }
}


