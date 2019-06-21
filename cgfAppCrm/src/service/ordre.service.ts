import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,filter } from 'rxjs/operators';
import { transaction } from 'app/views/profile-client/profile-client.component';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OrdreService {
  achats=[]
  url="http://localhost:8080/"

  constructor(private http:HttpClient , private loginservice :LoginService) { 
    this.url = loginservice.url;
   }
  ordreByMoi(username:string,date)
  {
    let url =this.url+"ordre/getMontantOpByMonth/"+date+"?username="+username
    return this.http.get(url).pipe(
      map(data=>data)
    );
  }

  getOrdreByCommercial(username:string):Observable<any>{
    return this.http.get<any>(this.url+"ordre/gets").pipe(
      map((jsonArray:any[])=>jsonArray
      .filter(
        (ordre:any)=>ordre.usernameCommercial==username
        )
      )
    )
  }

  getOrdreByNumCpt(numcpt:number,date){
    let url1=this.url+"ordre/getOrdreByNumCpt/"+date+"?numcpt="+numcpt
    return this.http.get(url1).pipe(
      map((data:any[])=>data)
    )
  }
  getOperationByNumCompte(numCompt,date){
     let urlc = this.url+"ordre/getOrdreByCliet/"+date+"?numclient="+numCompt
     return this.http.get(urlc).pipe(
       map((data:any[])=>data)
     )
  }
  getLastTransactionByNumCompte(numcpt) {
    let urlc = this.url+"getLastTransactionByNumCompte?numcpt="+numcpt
    return this.http.get(urlc).pipe(
      map((data:transaction[])=>data)
    )
  }

}
