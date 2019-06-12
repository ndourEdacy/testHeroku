import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReclamentionService {
  
  url="http://localhost:8080/"
  constructor(private http:HttpClient) { }
 

  addReclamention(reclamention){
    let urlc = this.url+"addReclamention"
      return this.http.post(urlc,reclamention).pipe(
        map(data=>data)
      );
  }

  getReclamention(id:number){
    let urlr = this.url+"getReclamentiionByNumCpt?numcpt="+id;
    return this.http.get(urlr).pipe(
      map((data:any)=>data)
    );
  }

}
