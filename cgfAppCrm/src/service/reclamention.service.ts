import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ReclamentionService {
  
  url="http://localhost:8080/"
  constructor(private http:HttpClient, private loginservice :LoginService) { 
    this.url = loginservice.url;
    
  }
 

  addReclamention(reclamention){
    let urlc = this.url+"addReclamention"
      return this.http.post(urlc,reclamention).pipe(
        map((data:any)=>data)
      );
  }

  getReclamention(id:number){
    let urlr = this.url+"getReclamentiionByNumCpt?numcpt="+id;
    return this.http.get(urlr).pipe(
      map((data:any)=>data)
    );
  }
  modifReclamention(reclamention){
    let urlc = this.url+"putReclamention"
      return this.http.put(urlc,reclamention).pipe(
        map((data:any)=>data)
      );
  }
}
