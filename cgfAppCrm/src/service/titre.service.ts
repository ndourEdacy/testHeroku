import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Titre } from './client.service';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class TitreService {
 url="http://localhost:8080/"
  constructor(private http:HttpClient, private loginservice :LoginService) { 
    this.url = loginservice.url;
   }
  getAllTitre(){
      let urlc=this.url+"titre/getAllTitre";
      return this.http.get(urlc).pipe(
        map((data:Titre[])=>data)
      )
  }
}
