import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'service/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Portefeuille } from 'models/portefeuille';
import { Reclamention } from 'models/reclamention';
import { ReclamentionService } from 'service/reclamention.service';
import { LoginService } from 'service/login.service';
import { OrdreService } from 'service/ordre.service';
import { UploadFileServiceService } from 'app/upload-file-service.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TacheService } from 'service/tache.service';
import { NgxSpinnerService } from 'ngx-spinner';

export interface transaction{
  
    codeTitre: string;
    dateTrn: string;
    montantB: number;
    typeTrn: string;
    nomTitre:string;
  
  
}
@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.scss']
})
export class ProfileClientComponent implements OnInit , OnDestroy{
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

num=0;
client={
      "id":0,
      "numCompt":0,
      "nom":"",
      "dateNaiss":"",
      "phone":"",
      "cni":"",
      "email":"",
      "cptNoCli":0,
      "clientId":0
}
clients:any[]=[]
portefeuilles:Portefeuille[]=[]
taches:any[]=[];
notes:any[]=[];
reclamentions:Reclamention[]=[]
reclamention={
  "statut":"",
  "sujet":"",
  "description":"",
  "userInvited":"",
  "usernameCom":"",
  "dateReclamention":"",
  "idReclamention":0,
  "degresDaccomplisement":0,
  "numCompte":0 
}
operations:transaction[];
tabeNumCompte:number[]=[]
users:any[]=[]
numcpt=0
operation:any
pathFile:""
path = "C:\\Users\\it.dev\\Documents\\NetBeansProjects\\cgd-epargne\\uploads\\";
filename:string[]=[];
anneEnCour="2018"
dateDebutTache
userInvited
  constructor(private clientService:ClientService,private router:ActivatedRoute,private route:Router,private reclamentionService:ReclamentionService,
              private loginService:LoginService,private ordreService:OrdreService,private uploadService:UploadFileServiceService,private tacheservice:TacheService,
              private spinner: NgxSpinnerService){ 
      this.num = 0
      this.reclamention.idReclamention=0
      this.router.params.forEach(param=>{
          this.num = param.id
         
          if( this.num == 0){
              route.navigate(["cgf-crm/admin1/",loginService.getUserName()])
          }
      })
       
        //repurer les comptes avec leur portefeuille
     
       
     
  }

  ngOnInit() {
          this.spinner.show();
          this.clientService.getProfilClient(this.num).subscribe(data=>{

            this.client = data[0];
            this.clients = data;
         
           this.getPortefeuille();
            //this.dernierOperation(this.client.numCompt)
            // if(this.client!=null)
            // {
              this.clientService.setIdCleint(this.client.clientId)
            
              this.numcpt = this.client.numCompt;

              // this.clientService.getTheLastOperationByNumCompte(this.client.numCompt).subscribe(data=>{
              //   this.operations = data;

              //    console.log(this.operations)

              //   this.spinner.hide();
              // });

                this.clientService.getAllNote(this.client.numCompt).subscribe(data=>{
                
                    this.notes = data;
                    
                })

                this.tacheservice.getTacheByNumCpt(this.client.numCompt).subscribe(data=>{
                  this.taches = data;
                })

            // }

            // this.ordreService.getOperationByNumCompte(this.num,this.anneEnCour).subscribe(data=>{

            //     this.operations = data;
            //     console.log(data)

            // })
            this.ordreService.getLastTransactionByNumCompte(this.client.numCompt).subscribe(data=>{

              this.operations = data;
              for(let i = 0 ; i < data.length ; i++) {
                this.operations[i].nomTitre = this.clientService.getNomTitre(data[i].codeTitre)
                this.operations[i].montantB = Math.abs(this.operations[i].montantB);
              }
                
        
            });

            this.reclamentionService.getReclamention(this.numcpt).subscribe(data=>{
              this.reclamentions = data;
            })
            
        });
       
        //this.theLastTransaction(this.client.numCompt);
  }
  ngOnDestroy() {
    // ...
    
  }
 theLastTransaction(num) {
    this.ordreService.getLastTransactionByNumCompte(num).subscribe(data=>{

      this.operations = data;
      for(let i = 0 ; i < data.length ; i++) {
        this.operations[i].nomTitre = this.clientService.getNomTitre(data[i].codeTitre)
      }
        

    })
  }

  detailPortefeuille(num:number){
    //num=numCompte du cient
     this.route.navigate(["detailClient",num])
  }
  getPortefeuille(){
     
      this.clientService.getPortefeuillesByClient(this.num).subscribe(data=>{
          
          this.portefeuilles = data
        
          if( this.portefeuilles != null && this.clients!=null)
          {

            for(let i =0 ; i < this.portefeuilles.length ; i++) {

                if( this.portefeuilles[i].numCompt == this.clients[i].numCompt) {
                  this.portefeuilles[i].typeCompte = this.clients[i].typeCompte
                  this.clientService.getPortefeuilleClientByNumcompte(this.clients[i].numCompt).subscribe(data=>{
                               this.portefeuilles[i].portefeuille= data[1];
                               this.portefeuilles[i].liquidite= data[0];
                             
                        });
                }
                this.tabeNumCompte.push(this.portefeuilles[i].numCompt)
            }
          
          }

        

      })
    
      
  }

    voirReclamention(id:number){
           for(let i =0 ; i < this.reclamentions.length ; i++){

              if(this.reclamentions[i].idReclamention == id) {
                 this.reclamention.statut = this.reclamentions[i].statut
                 this.reclamention.degresDaccomplisement = this.reclamentions[i].degresDaccomplisement
                 this.reclamention.description = this.reclamentions[i].description
                 this.reclamention.sujet = this.reclamentions[i].sujet
                 this.reclamention.idReclamention = this.reclamentions[i].idReclamention
              }
           }
    }
    
    saveReclamention(){
        this.reclamention.numCompte = this.numcpt
        this.reclamention.usernameCom = this.loginService.getUserName()
       
         this.reclamentionService.addReclamention(this.reclamention).subscribe(data=>{
            console.log(data)
            if(data!= null){

             this.reclamentions.push(data)
            }

         })
    }
    modifReclamention(){
        this.reclamentionService.modifReclamention(this.reclamention).subscribe(data=>{
              if(data != null)
                this.modifLocal(data)
        })
    }

    modifLocal(d:any){
       for(let i=0 ; i < this.reclamentions.length ; i++)
       {
          if(this.reclamentions[i].idReclamention == d.idReclamention)
          this.reclamentions[i] = d
       }
    }
    dernierOperation(numCompte:number)
    {
        this.ordreService.getOrdreByNumCpt(numCompte,this.anneEnCour).subscribe(data=>{
            console.log(data)
        })
    }

    ajouterNote(numCompt:number){
      this.clientService.setIdCleint(numCompt)
      this.route.navigate(["note"])
    }

    ajouterTache(num:number)
    {
       this.route.navigate(["tache",num])
    }

    selectFile(event) {
      this.progress.percentage = 0;
      this.selectedFiles = event.target.files;
    }
   
    upload() {
        this.progress.percentage = 0;
    
        this.currentFileUpload = this.selectedFiles.item(0);
        this.uploadService.saveDocument(this.currentFileUpload,this.num).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress.percentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              console.log('File is completely uploaded!');
            }
         
        });
   
      this.selectedFiles = null;
    }
  
    voirDocument(){
      // this.uploadService.downloadFile("18964-rapporOp.PNG",this.num).subscribe(data=>{
      //   console.log(data)
      // })
      this.uploadService.getsFileName(this.num).subscribe(data=>{
         if(data!=null)
         {

            for(let i=0 ; i < data.length ; i++){
              this.filename[i] = this.path+data[i]
            }
        
        }

      })
    }
    getUser(){
      this.reclamention = {
        "statut":"",
        "sujet":"",
        "description":"",
        "userInvited":"",
        "usernameCom":"",
        "dateReclamention":"",
        "idReclamention":0,
        "degresDaccomplisement":0,
        "numCompte":0 
      }
       this.loginService.getAllUser().subscribe(data=>{
            this.users=data
       });
    }
    modifier(n){

    }
    voirProfil(numCompt){
      
    }
    modif(id) {

    }
    chercherTache(){

    }

    modifTache(idTache){

    }
    // getOrdreById(id:number){
    //   for(let i=0 ; i < this.operations.length ; i++){
    //     if( this.operations[i].idOrdre == id){
    //       this.operation = this.operations[i]
         
    //     }
    //   }
    // }
}
