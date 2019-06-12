import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdreService {
  achats=[]
  constructor(private http:HttpClient) { }
  url="http://localhost:8080/"
  ordreByMoi(username:string)
  {
    let url ="http://localhost:8080/ordre/getMontantOpByMonth?username="+username
    return this.http.get(url).pipe(
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

  getOrdreByNumCpt(numcpt:number){
    let url1=this.url+"ordre/getOrdreByNumCpt?numcpt="+numcpt
    return this.http.get(url1).pipe(
      map((data:any[])=>data)
    )
  }
  
 
}
