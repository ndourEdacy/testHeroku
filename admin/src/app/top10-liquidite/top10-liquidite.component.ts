import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PortefeuilleService } from 'app/portefeuille.service';
import { ClientService } from 'app/client.service';
export interface client{
  nom:string;
  phone:string;
  email:string;
  numCompt:number;
  typeCompte:string;
  liquidite:number;
  portefeuille:number;
  username:string;


}
@Component({
  selector: 'app-top10-liquidite',
  templateUrl: './top10-liquidite.component.html',
  styleUrls: ['./top10-liquidite.component.scss']
})
export class Top10LiquiditeComponent implements OnInit {

  clients:client[] = []
  username=""
  num = 0;
  navigationSubscription
  constructor(private router:Router,private portefeuilleservice:PortefeuilleService,private clientService:ClientService) {
     
      this.getTop10Portefeuille()
   }
  
 

  ngOnInit() {
     
  }
  ngOnDestroy() {}
      
  getTop10Portefeuille(){
   
    this.portefeuilleservice.gettop10liquidite().subscribe(data=>{
        this.getClients(data)
    })
  }
  detailClient(id){
    this.router.navigate(["/detailclient",id])
  }

  getClients(data:any[]){
        
         this.clients = this.clientService.getClients(data);
         

  }

}
