
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,filter } from 'rxjs/operators';
import { AdminServiceService } from './admin-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrdreService {
  achats = []
  url = ''
  constructor(private http: HttpClient, private adminservice: AdminServiceService) {
    this.url = adminservice.getUrl();
   }
 
  ordreByMoi(username:string,date)
  {
    let url1 =this.url+"/ordre/getMontantOpByMonth/"+date+"?username="+username
    return this.http.get(url1).pipe(
      map(data=>data)
    );
  }

  getOrdreByCommercial(username:string):Observable<any>{
    return this.http.get<any>("http://localhost:8080/ordre/gets").pipe(
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

}
