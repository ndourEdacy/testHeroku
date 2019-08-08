import { Component, OnInit } from '@angular/core';
import { client } from '../listeclient/listeclient.component';
import { LoginService } from 'service/login.service';
import { ClientService } from 'service/client.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top10-liquidite',
  templateUrl: './top10-liquidite.component.html',
  styleUrls: ['./top10-liquidite.component.scss']
})
export class Top10LiquiditeComponent implements OnInit {

  clients:any[] = []
  username=""
  num = 0;
  navigationSubscription
  constructor(private loginService:LoginService,private clientService:ClientService,private router:Router) {
     
     
    
      this.getTop10Portefeuille()
   }
  
 

  ngOnInit() {
    this.username = sessionStorage.getItem("username")
      
    if(this.username == undefined)
      this.router.navigate(["login"])
  }
  ngOnDestroy() {}
      
  getTop10Portefeuille(){
   
    
      
        this.loginService.getTop10LiquiditeByCommercial(this.loginService.getUserName()).subscribe(data=>{
          this.getClients(data)
        
         this.clientService.getportefeuilleClients(this.clients)
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
                //cts[i].portefeuille = data[i].portefeuille;
               // cts[i].liquidite = data[i].liquidite;
            });
          
        }
        this.clients = cts;
        

  }

}
