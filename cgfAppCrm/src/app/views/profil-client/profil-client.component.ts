import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'service/client.service';

@Component({
  selector: 'app-profil-client',
  templateUrl: './profil-client.component.html',
  styleUrls: ['./profil-client.component.scss']
})
export class ProfilClientComponent implements OnInit {
idClient:number
client:any
  constructor(private router:ActivatedRoute,private clientservice:ClientService) {
       
    router.params.forEach(param=>{
           this.idClient = param.id
        });

        this.client = this.clientservice.getClientById(this.idClient)
       
   }

  ngOnInit() {
  }

}
