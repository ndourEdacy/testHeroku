import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'service/login.service';

@Component({
  selector: 'app-client-not-found',
  templateUrl: './client-not-found.component.html',
  styleUrls: ['./client-not-found.component.scss']
})
export class ClientNotFoundComponent implements OnInit {
 val = true;
  constructor(private route:Router,private username:LoginService) { }
   retour(){
    this.val = false
    this.route.navigate(["/cgf-crm/admin1",this.username.getUserName()]);
   }
  ngOnInit() {
  }

}
