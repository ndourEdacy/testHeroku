import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'service/client.service';

@Component({
  selector: 'app-modif-clinet',
  templateUrl: './modif-clinet.component.html',
  styleUrls: ['./modif-clinet.component.scss']
})
export class ModifClinetComponent implements OnInit {
 client:any
 id=0
  constructor(private router:ActivatedRoute,private clientservice:ClientService,private route:Router) { 
    router.params.forEach(param=>{
       this.id=param.id
    })
    
   this.client = clientservice.getClientById(this.id)
   console.log(this.client)
  }

  ngOnInit() {
  }
  modifClient(){
    this.clientservice.modifClient(this.client)
    this.route.navigate(["detailClient",this.id])
  }
}
