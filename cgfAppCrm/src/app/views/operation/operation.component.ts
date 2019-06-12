import { Component, OnInit } from '@angular/core';
import { ClientService } from 'service/client.service';
import { OperationService } from 'service/operation.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
 
  client = {
    "id":0,
    "prenom":"",
    "nom":"",
    "dateNaiss":"",
    "cni":""
  }
  exist=true;
  msg=""
  op=false;
  
  constructor(private clientservice:ClientService,private operationService:OperationService) { }

  ngOnInit() {
  }
  
  chercheCni(cni:string){
    this.client = this.clientservice.chercherClientByEmail(cni)
    if(this.client != null){
      this.exist=false;
    }
    else{
      this.exist=true;
      this.client = {
        "id":0,
        "prenom":"",
        "nom":"",
        "dateNaiss":"",
        "cni":""
      }
    }
    

  }

  operation(o){
    this.operationService.operation(o);
    this.operationService.getOperationByIdCleint(this.client.id)
  }
}
