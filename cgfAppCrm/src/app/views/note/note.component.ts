import { Component, OnInit } from '@angular/core';
import { NoteService } from 'service/note.service';
import { ClientService } from 'service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'service/login.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  note={
    "id":0,
    "sujet":"",
    "description":"",
    "idclient":0,
    "isChecked":false,
    "dateCreat":"",
    "numCmt":0,
    "userCreate":""
  }
  choix=false
  clients:any
  idClient=0
  nomclient:any
  cni:""
  constructor(private noteService:NoteService,private clientservice:ClientService,private router:Router,private route:ActivatedRoute,private userService:LoginService) { 
    this.idClient = clientservice.getIdClient()
    clientservice.getClientById(this.idClient).subscribe(data=>{
      this.nomclient = data['nom']
     
    })
  }

  ngOnInit() {
  }
  ajouterNote(){
   
    //this.noteService.ajouterNote(this.note);
     this.note.numCmt=this.idClient
     let today = new Date()
      let jj = today.getDate() 
      let mm = today.getMonth()
      let yy = today.getFullYear()
      this.note.dateCreat= yy+"-"+mm+"-"+jj
      this.note.userCreate = this.userService.getUserName()
    //this.clientservice.ratacherTache(this.note.id,this.idClient)
    this.clientservice.addNote(this.note).subscribe(data=>{
      
      this.router.navigate(["detailClient/",this.idClient])
    })
    
  }

  getClient(){
    this.clients = this.clientservice.getAllClient()
  }
  
  saveChoix()
  {
      this.note.isChecked = false
      let today = new Date()
      let jj = today.getDate() 
      let mm = today.getMonth()
      let yy = today.getFullYear()
      this.note.dateCreat= yy+"-"+mm+"-"+jj
      let c = this.clientservice.getClientById(this.idClient)
     // this.nomclient = c.prenom+" "+c.nom
     
  }

  checkValue(even:any,id:number)
  {
    if(even == "A")
    {
     this.idClient = id
      
    }
    else{
      this.note.isChecked = false
      this.idClient=-1
    }
    
  }
  chercher(){
    this.clients=[]
    this.clients.push(this.clientservice.chercherClientByEmail(this.cni))
  }

}
