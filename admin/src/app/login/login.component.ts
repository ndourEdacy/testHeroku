import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';

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
  constructor(private loginService:LoginService,private route:Router) {
    
   }

  ngOnInit() {
    this.username = sessionStorage.getItem("username")
    if( this.username  != undefined){
      this.gopageuser()
    }
     
  
  }
  logIn(){
   // this.spinner.show();
   this.loginService.getuser(this.username,this.password).subscribe((data:any)=>{
    
      this.user = data
      if(this.user!=null)
      {
        //this.spinner.hide();
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
  
  gopageuser() {

    // this.loginService.setlogin(true)
    // this.loginService.setUsername(this.username)
    this.route.navigate(['dashboard'])
  }
}
