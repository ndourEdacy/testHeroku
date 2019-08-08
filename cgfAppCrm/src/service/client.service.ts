import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Portefeuille } from 'models/portefeuille';
import { TitreService } from './titre.service';
import { LoginService } from './login.service';
export class Titre{
   "idPortefeuille":0
   "cptNo":0
   "quantite":0
   "codeTitre":string
   "cmp":0
   "prixDuJour":""
   "montant":0
   "nomTitre":string
   "dateDujour":string
  
}
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients:any[]=[]
  titres:Titre[]=null
  id=0
  url="http://localhost:8080/"
  constructor(private router:Router,private http:HttpClient,private titreService:TitreService ,private loginservice: LoginService) { 
    this.url = loginservice.url;

    titreService.getAllTitre().subscribe(data=>{
      this.titres = data
      
    })
  }
  getClientBynumComp(num) {
    let urlc= this.url+"/client/getByCmpt?numcpt="+num;
     
    return this.http.get(urlc);
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
   
    return this.clients
  }
  getPortefeuilleClientByNumcompte(numcpt:number){
    let urpl=this.url+"getPortefeuilleClient/222?numcompte="+numcpt ;
    let urlp =  this.url+"gePortefeuilleClient?numcompte="+numcpt;
    return this.http.get(urlp).pipe(
      map((data:any[])=>data)
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
  getportefeuilleClients(clients:any[]){
    if(clients != null)
    {
        for(let i = 0 ; i < clients.length ; i++) {

            this.getPortefeuilleClientByNumcompte(clients[i].numCompt).subscribe(data=>{
                clients[i].portefeuille = data[1];
                clients[i].liquidite = data[0];
               
            }); 
            
        }
    }
  }
  getClientByNumCpt(id:number){
 
    let urlc = this.url+"/client/getByCmpt?numcpt="+id;

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

  findClientCgfByNumCompte(num){
    let urlch = this.url+"ClientCgf/findClientCgfByNumCompte/"+num

    return this.http.get(urlch).pipe(
      map((data:any)=>data)
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
     let url2 = this.url+"getCourtageByYear/2019?numcompte="+id
     return this.http.get(url2).pipe(
       map((data:number)=>data)
     )
   }
   
   getCourtage(id:number,year){
   
    let url2 = this.url+"getCourtageByYear/"+year+"?numcompte="+id
    return this.http.get(url2).pipe(
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
        const url2 = this.url+"portefeuillejj/getPortefeuilleduJourByNumCompte?numcompte="+numcpt;
        return this.http.get(url2).pipe(
          map((data:Titre[])=> data)
        );

  }

   getProfilClient(num:number){
     let urlp=this.url+"clients/getsClient?numcpt="+num
     return this.http.get(urlp).pipe(
       map((data:any[])=>data)
     )
   }
   getPortefeuillesByClient(num:number){
     let urlp = this.url+"portefeuille/getPortefeuillesClient?cptnocli="+num;
     return this.http.get(urlp).pipe(
       map((data:Portefeuille[])=>data)
     )
   }

   getNomTitre(codeTitre:string) :string {
    let nom=""

     for(let i = 0 ;i < this.titres.length ; i++){
      
        if( this.titres[i].codeTitre.trim() == codeTitre){
          nom= this.titres[i].nomTitre;
         
          return nom;
        }
          
     }
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
  public getPhoningsByNumCompte(numcompte){
    let urlc = this.url+"phoning/getPhonningByNumcpt?numcompte="+numcompte;
    return this.http.get(urlc).pipe(
      map((data:any[])=>data)
    )
  }
  public getStatistiqueByDateByNumcompteByTypeTransanction(date:string , numcompte:number){
    let urls = this.url+"getStatistiqueByDateByNumcompteByTypeTransanction/"+date+"?numcompte="+numcompte;

    return this.http.get(urls).pipe(
      map((data:number[])=>data)
    )
  }

  public getPhoningById(id){
    let u = this.url+"phoning/getPhonningById/"+id

    return this.http.get(u);
  }

  public getClienByNumcpt(numcpt){
    let uc = this.url+"client/getByCmpt?numcpt="+numcpt

     return this.http.get(uc).pipe(
       map((data:any)=>data)
     )
  }
}


