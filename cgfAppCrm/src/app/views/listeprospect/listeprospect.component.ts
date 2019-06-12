import { Component, OnInit } from '@angular/core';
import { ProspectService } from 'service/prospect.service';
import { Prospect } from 'models/prospect';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listeprospect',
  templateUrl: './listeprospect.component.html',
  styleUrls: ['./listeprospect.component.scss']
})
export class ListeprospectComponent implements OnInit {
   prospects:any[]=[]
  constructor(private prospectService:ProspectService,private router:Router) { 
    this.prospects = prospectService.getAllProspect()
    console.log(this.prospects)
  }

  ngOnInit() {
  }
  detailProspect(id:number)
  {
         this.router.navigate(["detailProspect/",id])
  }
}
