import { Component, OnInit } from '@angular/core';
import { ClientService, Titre } from 'service/client.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'service/login.service';
import { LoginComponent } from '../login/login.component';
import { TitreService } from 'service/titre.service';
import { NgxSpinnerService } from 'ngx-spinner';

export interface client{
   nom:string;
   phone:string;
   email:string;
   numCompt:number;
   typeCompte:string;
   liquidite:number;
   portefeuille:number;
   cptNoCli: number;

}

@Component({
  selector: 'app-listeclient',
  templateUrl: './listeclient.component.html',
  styleUrls: ['./listeclient.component.scss']
})
export class ListeclientComponent implements OnInit {
  clients:client[]=[]
  client:any={}
  cni=""
  nombreClient=0
  page=1
  liquiditeInf=300000
  liquiditeSup=1000000
  titres:Titre[]=[]
  montantInf=1000000;
  montantSup=2000000;
  portefeuilleClient:any[]=[];
  username="";
  constructor(private clientService:ClientService,private router:Router,private loginService:LoginService,private titreService:TitreService,private spinner: NgxSpinnerService) {
    
   }

  ngOnInit() {

      this.clients = this.clientService.getClient()
      
       this.username = sessionStorage.getItem("username")
       if( this.username == undefined)
         this.router.navigate(["login"])

      if(this.clientService.getTitre()==null || this.clientService.getTitre().length == 0 )
      {

          this.titreService.getAllTitre().subscribe(data=>{
           
              this.clientService.setTitre(data);
              this.titres = data;

          });

      }
      else{

         this.titres = this.clientService.getTitre();

      }
     
      this.spinner.show();
      if(this.clients == null || this.clients.length==0)
      {
       
      
          this.clientService.getClientByUser(this.username).subscribe(data=>{
          
              this.clients = data;
              this.getportefeuilleClients()
              this.nombreClient=this.clients.length
              this.clientService.setClient(this.clients)
              this.spinner.hide();
          })

      }
      else{
        this.spinner.hide();
      }
      
     //this.getTop10Portefeuille()
   
    
  }
  getclientMou(){
 
  this.spinner.show();
    this.clientService.getClientByLiquidite(this.liquiditeInf,this.liquiditeSup,this.loginService.getUserName()).subscribe(
       data=>{
            this.clients=data
            this.getportefeuilleClients();
           
       }
    )

  }
  detailClient(id){
   
   this.router.navigate(["/profileClient",id])
   
  }
  modifClient() {
    this.client = this.clientService.modifClient(this.client)
  }
  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.client))
  }
  recherche(){
    
    this.client = this.clientService.chercherClientByEmail(this.cni);
    
    if(this.client!=null)
    {
      this.detailClient(this.client.id)
    }
  }

  getOperationByMontant(){

  }

  getportefeuilleClients(){
          if(this.clients != null)
          {
              for(let i = 0 ; i < this.clients.length ; i++) {

                  this.clientService.getPortefeuilleClientByNumcompte(this.clients[i].numCompt).subscribe(data=>{
                      this.clients[i].portefeuille = data[1];
                      this.clients[i].liquidite = data[0];
                     
                  }); 
                  
              }
          }
          this.spinner.hide();
  }

  getTop10Portefeuille(){
    let cts:client[]=[];
   
    let j = 0;
    this.loginService.getTop10Portefeuille(this.username).subscribe(data=>{
        for(let i = 0 ; i < data.length ; i++){
          
           this.clientService.getClientByNumCpt(data[i].numCompt).subscribe(res=>{
             
                cts[i] = res;
                cts[i].portefeuille = data[i].portefeuille;
                cts[i].liquidite = data[i].liquidite;
           });
          
        }
        this.clients = cts;
    });

  }

}
