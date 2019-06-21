import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

export class Cours{
   nomTitre:String
   codeTitre:String
   prix:String
}

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  url="http://localhost:8080/";
  constructor(private http:HttpClient , private loginservice: LoginService) {
    this.url = loginservice.url;
    
  }
  coursDuJour:Cours[]=[];
  titres:any[]=[];
  cours:any[]=[];
  async getAllcourDuJour(){
    let urlc = this.url+"cours/getAllCoursDuJour";
     return await this.http.get(urlc).toPromise();
  }

  async getAlltitre(){
    let urlt = this.url+"titre/getAllTitreAction";
    return await this.http.get(urlt).toPromise();
  }
 
  

}
