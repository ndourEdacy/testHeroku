import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from 'service/note.service';
import { ClientService } from 'service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'service/login.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {
  note={
    "idNote":0,
    "sujet":"",
    "description":"",
    "idclient":0,
    "isChecked":false,
    "dateCreat":"",
    "numCompte":0,
    "userCreate":""
  }
  choix=false
  clients:any
  idClient=0
  nomclient:any
  cni:""
  numClient=0
  numCpt=0
  notes:any[] = [];
  constructor(private noteService:NoteService,private clientservice:ClientService,private router:Router,private route:ActivatedRoute,private userService:LoginService) { 
    this.idClient = clientservice.getIdClient()
    clientservice.getClientById(this.idClient).subscribe(data=>{
      this.nomclient = data['nom']
      this.numClient = data['cptNoCli']
      this.numCpt = data['numCompt']
      console.log(this.numCpt)
    })
      noteService.getsNotes(userService.getUserName()).subscribe(data=>{
        this.notes = data
      })
  }

  ngOnInit() {
  }
  ajouterNote(){
   
    //this.noteService.ajouterNote(this.note);
     this.note.numCompte=this.numCpt
    //  let today = new Date()
    //   let jj = today.getDate() 
    //   let mm = today.getMonth()
    //   let yy = today.getFullYear()
      //this.note.dateCreat= yy+"-"+mm+"-"+jj
      this.note.userCreate = this.userService.getUserName()
    //this.clientservice.ratacherTache(this.note.id,this.idClient)
    this.clientservice.addNote(this.note).subscribe(data=>{
      console.log(data)
      if(data!=null)
      this.router.navigate(["profileClient/",this.numClient])
      this.noteService.getsNotes(this.userService.getUserName()).subscribe(data=>{
        this.notes = data
      })
    })
    
  }
  ngOnDestroy() {
    // ...
  }
  detailClient(id){

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
      this.clientservice.getClientById(id).subscribe(data=>{
          this.nomclient = data.nom
          this.note.numCompte = data.numCompt
      })
    }
    else{
      this.note.isChecked = false
      this.idClient=-1
    }
    console.log(this.idClient)
  }
  chercher(){
    this.clients = [];
    this.clients.push(this.clientservice.chercherClientByEmail(this.cni));
     this.clientservice.chercherClientByName(this.cni).subscribe(data=>{
         this.clients = data
     })
  }

}
