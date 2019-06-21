import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
 url="http://localhost:8080/";
 isVisiteNotification: false;
  constructor(private http:HttpClient , private loginservice :LoginService) { 
    this.url = loginservice.url;

   }

  getClientPotentiel(username:string,montant:number){
   let urlc=this.url+"/portefeuille/getClientAcontacter?username="+username+"&&liquidite="+montant
    return this.http.get(urlc).pipe(
       map((data:any[])=>data)
    )
  }
getisVisiteNotification()
{
  return this.isVisiteNotification;
}
setisVisiteNotification(bool){
  this.isVisiteNotification = bool;
}
  getTacheAfaire(username:string){
   let urlt = this.url+"tache/getTacheByCommercialDuJour?username="+username;
    return this.http.get(urlt).pipe(
      map((data:any[])=>data)
    )
  }

  getAlerteDuJour(username:string){
    let urla=this.url+"alerte/notificationAlerte?username="+username
    return this.http.get(urla).pipe(
      map((data:any[])=>data)
    )
  }
}
