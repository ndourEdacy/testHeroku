import { Component, OnInit } from '@angular/core';
import { LoginService } from 'service/login.service';
import { Router } from '@angular/router';
import { OrdreService } from 'service/ordre.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  loading:boolean
  private dataAchat=[];
  private dataVente=[];
  private dataSubs=[];
  constructor(private loginService:LoginService,private route:Router,private odreservice:OrdreService,private spinner: NgxSpinnerService) {
    
   }

  ngOnInit() {
    this.username = sessionStorage.getItem("username")
    if( this.username  != undefined){
      this.gopageuser()
    }
     
  
  }
  logIn(){
    this.spinner.show();
   this.loginService.getuser(this.username,this.password).subscribe((data:any)=>{
    
      this.user = data
      if(this.user!=null)
      {
        this.spinner.hide();
        sessionStorage.setItem("username",this.username)
        // this.loginService.setlogin(true)
        // this.loginService.setUsername(this.username)
        // this.route.navigate(["cgf-crm/admin1",this.username])
        this.gopageuser()
      }
     
   })
 /*  this.loginService.getCommissionCgfByAchat().subscribe(data=>{
     console.log(data)
   })*/
  }
  
  gopageuser(){
    
    this.loginService.setlogin(true)
    this.loginService.setUsername(this.username)
    this.route.navigate(["cgf-crm/admin1",this.username])
  }
}
