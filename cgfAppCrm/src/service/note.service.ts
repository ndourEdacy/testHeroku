import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes:any[]=[{
    "id":1,
    "sujet":"ouvrir compte",
    "description":"blabla",
    "idclient":1,
    "dateCreate":"2018-10-23"
  },{
    "id":2,
    "sujet":"operation achat",
    "description":"blabla",
    "idclient":2,
    "dateCreate":"2018-10-25"
  },{
    "id":3,
    "sujet":"vente titre",
    "description":"blabla",
    "idclient":3,
    "dateCreate":"2018-10-22"
  },{
    "id":4,
    "sujet":"zinzin ",
    "description":"blabla",
    "idclient":2,
    "dateCreate":"2018-10-12"
  },{
    "id":5,
    "sujet":"subscription",
    "description":"blabla",
    "idclient":1,
    "dateCreate":"2018-10-23"
  }]
  noteRattacherClient:any[]=[]
  id=0
  constructor() { }

  ajouterNote(n){
     n.id = ++this.id;
      this.notes.push(n);
  }
  getAllNote(){
    return this.notes;
  }
  getNoteId(id:number){

    this.notes.forEach(n=>{

           if(n.id == id){
             return n;
           }
    
    });
    return null;
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

  
}
