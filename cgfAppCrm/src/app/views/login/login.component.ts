import { Component, OnInit } from '@angular/core';
import { LoginService } from 'service/login.service';
import { Router } from '@angular/router';
import { OrdreService } from 'service/ordre.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  user:any=null;
  login1:boolean;
  private dataAchat=[];
  private dataVente=[];
  private dataSubs=[];
  constructor(private loginService:LoginService,private route:Router,private odreservice:OrdreService) {
    
   }

  ngOnInit() {
    
  }
  logIn(){

   this.loginService.getuser(this.username,this.password).subscribe((data:any)=>{
    
      this.user = data
      if(this.user!=null)
      {
        this.loginService.setlogin(true)
        this.route.navigate(["cgf-crm/admin1",this.username])
      }
     
   })
 /*  this.loginService.getCommissionCgfByAchat().subscribe(data=>{
     console.log(data)
   })*/
  }

}
