import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TacheService } from 'service/tache.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'service/login.service';


@Component({
  selector: 'mdb-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']

})

export class AppComponent implements OnInit {
  values: string[] = ['Tag 1', 'Tag 2', 'Tag 4'];

  specialPage: boolean;
  taches:any[]=[];
  private specialPages: any[] = [
    '/pages/login',
    '/pages/register',
    '/pages/lock',
    '/pages/pricing',
    '/pages/single-post',
    '/pages/post-listing'
  ];

  private currentUrl = '';
  login=true;
  username:string;
  password:string;
  i=0;
  darkModeActive: boolean;

  constructor(
    private router: Router,
    private location: Location,
    private tacheService:TacheService,
    private htpp:HttpClient,
    private loginService:LoginService
  ) {
      
      this.router.events.subscribe((route:any) => {
          this.currentUrl = route.url;
          this.login=loginService.getLogin();
          this.specialPage = this.specialPages.indexOf(this.currentUrl) !== -1;
        
          if(this.currentUrl=="/login" || this.currentUrl=="/")
          {
             this.login = false;
             this.i = 1
          }
          else if( this.currentUrl == undefined && this.i == 0 )
          {
             this.login = true
          }
       
    });
   

  }
  modeToggleSwitch() {
    this.loginService.darkModeState.next(!this.darkModeActive);
  }
  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }
  logIn(){

  }
  

}
