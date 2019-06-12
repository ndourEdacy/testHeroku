import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AdminServiceService } from './admin-service.service';

@Injectable()
export class PortefeuilleService {
private url ='';
  constructor(private http: HttpClient , private adminservice: AdminServiceService) {
    this.url = adminservice.getUrl();
   }
 public gettop10portefeuille(){
   let urlp=this.url+"getTop10portefeuille"
   return this.http.get(urlp).pipe(
     map((data:any[])=> data)
   )
 }
 public gettop10liquidite(){
    let urlp=this.url+"getTop10Liquidite"
    return this.http.get(urlp).pipe(
      map((data:any[])=> data)
    )
 }
}
