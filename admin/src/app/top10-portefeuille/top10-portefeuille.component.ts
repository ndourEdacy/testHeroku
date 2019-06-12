import { Component, OnInit } from '@angular/core';
import { client } from 'app/top10-liquidite/top10-liquidite.component';
import { Router } from '@angular/router';
import { PortefeuilleService } from 'app/portefeuille.service';
import { ClientService } from 'app/client.service';

@Component({
  selector: 'app-top10-portefeuille',
  templateUrl: './top10-portefeuille.component.html',
  styleUrls: ['./top10-portefeuille.component.scss']
})
export class Top10PortefeuilleComponent implements OnInit {

 
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
   
    this.portefeuilleservice.gettop10portefeuille().subscribe(data=>{
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
