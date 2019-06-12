import { Component, OnInit } from '@angular/core';
import { ClientService } from 'service/client.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'service/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-listeclient',
  templateUrl: './listeclient.component.html',
  styleUrls: ['./listeclient.component.scss']
})
export class ListeclientComponent implements OnInit {
  clients:any[]=[]
  client:any={}
  cni=""
  nombreClient=0
  page=1
  liquiditeInf=300000
  liquiditeSup=1000000

  constructor(private clientService:ClientService,private router:Router,private loginService:LoginService) {
    
   }

  ngOnInit() {
    this.clients = this.clientService.getClient()
    console.log(this.clients)
    if(this.clients == null || this.clients.length==0){
      this.clientService.getClientByUser(this.loginService.getUserName()).subscribe(data=>{
        this.clients = data;
        this.nombreClient=this.clients.length
        this.clientService.setClient(this.clients)
      })
    }
  
   
    
  }
  getclientMou(){
  //   this.clientService.getclientMou("mlfall").subscribe(data=>{
  //     this.clients = data;
  //  })
    this.clientService.getClientByLiquidite(this.liquiditeInf,this.liquiditeSup,this.loginService.getUserName()).subscribe(
       data=>this.clients=data
    )
  }
  detailClient(id){
   // this.client = this.clientService.getClientById(id)
   this.router.navigate(["/detailClient",id])
   
  }
  modifClient() {
    this.client = this.clientService.modifClient(this.client)
  }
  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.client))
  }
  recherche(){
    console.log(this.cni)
    this.client = this.clientService.chercherClientByEmail(this.cni);
    
    if(this.client!=null)
    {
      this.detailClient(this.client.id)
    }
  }
}
