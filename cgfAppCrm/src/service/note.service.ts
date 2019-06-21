import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Note } from 'models/note';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  // {
  //   "id":1,
  //   "sujet":"ouvrir compte",
  //   "description":"blabla",
  //   "idclient":1,
  //   "dateCreate":"2018-10-23"
  // },{
  //   "id":2,
  //   "sujet":"operation achat",
  //   "description":"blabla",
  //   "idclient":2,
  //   "dateCreate":"2018-10-25"
  // },{
  //   "id":3,
  //   "sujet":"vente titre",
  //   "description":"blabla",
  //   "idclient":3,
  //   "dateCreate":"2018-10-22"
  // }

  notes:any[]=[]
  note:any
  noteRattacherClient:any[]=[]
  id=0
  url="http://localhost:8080/"
  constructor(private http:HttpClient , private loginservice :LoginService) { 
   
    this.url = loginservice.url;

  }

  ajouterNote(n){
     n.id = ++this.id;
     
      this.notes.push(n);
  }
   getsNotes(username){
    let url1=this.url+"user/getAllNoteByUsername?username="+username;
     return this.http.get(url1).pipe(
       map((data:Note[])=>data)
     )
   }
  async getAllNote(username){
      await this.getsNotes(username).subscribe(data=>{
        this.notes = data
      });
    return this.notes;
  }

  getNoteId(id:number){
   let urlid = this.url+"user/getNoteById/"+id;
   return this.http.get(urlid).pipe(
      map((data:any)=> data)
    );
  }

  mesNote(id:number)
  {
    this.noteRattacherClient = []
     this.notes.forEach(note=>{
       if(note.idclient == id)
       {
        this.noteRattacherClient.push(note)
       }
     })
     return this.noteRattacherClient
  }
 modifNote(note){
   const urln = this.url+"user/modifNote/";
   return this.http.put(urln,note);
 }
  
}
