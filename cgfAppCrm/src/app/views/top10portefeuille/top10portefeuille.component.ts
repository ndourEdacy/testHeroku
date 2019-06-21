import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'service/login.service';
import { client } from '../listeclient/listeclient.component';
import { ClientService } from 'service/client.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-top10portefeuille',
  templateUrl: './top10portefeuille.component.html',
  styleUrls: ['./top10portefeuille.component.scss']
})
export class Top10portefeuilleComponent implements OnInit,OnDestroy {
  clients:any[] = []
  username=""
  num = 0;
  navigationSubscription
  constructor(private loginService:LoginService,private clientService:ClientService,private router:Router,private location:Location) {
     
     
    
      this.getTop10Portefeuille()
   }
  
 

  ngOnInit() {
    this.username = sessionStorage.getItem("username")
      
    if(this.username == undefined)
      this.router.navigate(["login"])
  }
  ngOnDestroy() {}
      
  getTop10Portefeuille(){
     this.loginService.getTop10Portefeuille(this.loginService.getUserName()).subscribe(data=>{
          this.getClients(data)
      });
 }

  detailClient(id){
    this.router.navigate(["/profileClient",id])
  }

  getClients(data:any[]){
          let cts:client[]=[];
          for(let i = 0 ; i < data.length ; i++){
                
            this.clientService.getClientByNumCpt(data[i].numCompt).subscribe(res=>{
              
                cts[i] = res;
                cts[i].portefeuille = data[i].portefeuille;
                cts[i].liquidite = data[i].liquidite;
            });
          
        }
        this.clients = cts;

  }
}
