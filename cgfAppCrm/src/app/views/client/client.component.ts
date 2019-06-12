import { Component, OnInit } from '@angular/core';
import { ClientService } from 'service/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  client={
    id:0,
    nom:"",
    prenom:"",
    email:"",
    tel:"",
    dateNaiss:Date,
    adress:"",
    ville:"",
    pays:"",
    lieuNaiss:"",
    cni:""
  }
  constructor(private clientService:ClientService) { }

  ngOnInit() {
  }
  ajoutClient(){
    this.clientService.ajoutClient(this.client)
   
    console.log(this.clientService.chercherClientByName(this.client.nom,this.client.prenom,this.client.dateNaiss))
  }
}
