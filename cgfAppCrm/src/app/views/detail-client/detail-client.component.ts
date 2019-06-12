import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'service/client.service';
import { NoteService } from 'service/note.service';
import { OperationService } from 'service/operation.service';
import { TacheService } from 'service/tache.service';
import { OrdreService } from 'service/ordre.service';
import { LoginService } from 'service/login.service';
import { UploadFileServiceService } from 'app/upload-file-service.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ReclamentionService } from 'service/reclamention.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss']
})
export class DetailClientComponent implements OnInit {
  public map: any = { lat: 51.678418, lng: 7.809007 };
  public chart1Type:string = 'bar';
  public chart2Type:string = 'pie';
  public chart3Type:string = 'line';
  public chart4Type:string = 'radar';
  public chart5Type:string = 'doughnut';


  public chartType = 'line';
  private dataAchat=[];
  private dataVente=[];
  private dataSubs=[];
  public chartDatasets: Array<any>= [
    {data: this.dataVente, label: '#vente'},
    {data: this.dataAchat, label: '#achat'},
    {data: this.dataSubs, label: '#subscription'}
  ];;
  public chartDatasets1: Array<any> = [
    {data: [150, 400, 600, 510, 560, 550, 400, 600, 60, 500, 50], label: '#titre'},
    {data: [150005, 400000, 600000, 510000, 560000, 550000, 400000, 600000, 2000200, 50000, 500200], label: '#liquidite'}
    
  ];
  public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul','Au','Sep','Oct','Nov','Dec'];

  public chartColors:Array<any> = [

  ];

  public dateOptionsSelect: any[];
  public bulkOptionsSelect: any[];
  public showOnlyOptionsSelect: any[];
  public filterOptionsSelect: any[];
   
  taches:any[]=[{
    id:0,
    dateDebut:"2018-10-30",
    dateFin:"2018-10-31",
    description:"achnfbkfs lzjaie anniezn ankfie",
    sujet:"achat",
    statut:"active",
    priorite:"medium",
 }];
 reclamention={
  "numCompte":0,
  "usernameCom":"",
  "description":"",
  "statut":"", 
  "degresDaccomplisement":0
}
reclamentions:any[]=null
  notes:any[]=[];

  public chartOptions: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: '#5b5f62',
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#5b5f62',
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: '#5b5f62',
        }
      }]
    }
  };
   id:number;
   tache={
    id:0,
    dateDebut:Date,
    dateFin:Date,
    description:"",
    sujet:"",
    statut:"active",
    priorite:"medium",
 };

    note:any[]=[]
    client:object=null
    portefeuilleClient:object
    operations:any[]=[]
    titre:any[]=[]
    operation:object
    dateDebutTache:""
    montantAchat=0
    montantVente=0
    montantSubscription=0
    montantPortefeuille=0
    courtagecgf=0
    selectedFiles: FileList;
      currentFileUpload: File;
      progress: { percentage: number } = { percentage: 0 };
      users:any[]=[]
      userInvited:any
  constructor(private router:ActivatedRoute,private clientservice:ClientService,private route:Router,
    private noteservice:NoteService,private uploadService: UploadFileServiceService,
    private operationservice:OperationService,private tacheService:TacheService,
    private ordreService:OrdreService,private loginservice: LoginService,private reclamentionService:ReclamentionService) { 
    
   // this.notes = noteservice.mesNote(this.id)
   // this.operations = operationservice.getOperationByIdCleint(this.client.id)
   // console.log(this.operations)
        this.router.params.forEach(param=>{
          this.id=param.id;
          
        })
       
        this.reclamentionService.getReclamention(this.id).subscribe(data=>{
           this.reclamentions = data;
        })
      this.clientservice.getClientById(this.id).subscribe(data=>{
          this.client=data
          console.log(this.client)
      })

      this.clientservice.getPortefeuilleClientByNumcompte(this.id).subscribe(data=>{
            this.portefeuilleClient=data
            console.log(this.portefeuilleClient)
      })
      this.clientservice.getMontantOperationByMonth(this.id).subscribe(data=>{
        this.dataAchat= data[0];
        this.dataVente=data[1];
        this.dataSubs=data[2];
        this.chartDatasets= [
          {data: this.dataVente, label: '#vente'},
          {data: this.dataAchat, label: '#achat'},
          {data: this.dataSubs, label: '#subscription'}
        ];
        for(let i=0 ; i < this.dataAchat.length ; i++){
          this.montantAchat+=this.dataAchat[i]
          this.montantSubscription+=this.dataSubs[i]
          this.montantVente+=this.dataVente[i]
        }
       
      })

      ordreService.getOrdreByNumCpt(this.id).subscribe(data=>{
        this.operations=data;
      })
       
      clientservice.getAllNote(this.id).subscribe(data=>{
        this.notes=data
      })
  }

  rattacherDocument(even){
     even.preventDefault()
  }
  
  ngOnInit() {
   this.clientservice.getCouetage(this.id).subscribe(data=>{
      this.courtagecgf = data
   })
  }

  getOrdreById(idordre:number){
   this.operations.forEach(data=>{
     if(data.idOrdre == idordre)
     {
       this.operation=data
     }
   })
  }
  modifier(id){
   this.route.navigate(["modifClient/",id])
  }

  ajouterNote(id:number){
    this.clientservice.setIdCleint(id)
      this.route.navigate(["note"])
  }
  ajouterTache()
  {
     this.route.navigate(["tache"])
  }
  voirProfil(idclient){
   this.route.navigate(["profil/",idclient])
  }

  chercherTache(){
    this.taches=this.tacheService.getTache(this.dateDebutTache)
  }
  detailPortefeuille(numcpt:number){
    this.clientservice.detailPortefeuille(numcpt).subscribe(data=>{
        this.titre = data
        console.log(data)
    })
  }
  selectFile(event) {
    this.progress.percentage = 0;
    this.selectedFiles = event.target.files;
  }
 
  upload() {
      this.progress.percentage = 0;
  
      this.currentFileUpload = this.selectedFiles.item(0);
      this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      });
 
    this.selectedFiles = null;
  }
  ajouterReclamention(){
    this.loginservice.getAllUser().subscribe(data=>{
      this.users = data
      console.log(data)
    })
    this.reclamention.usernameCom = this.loginservice.getUserName();
    this.reclamention.numCompte = this.id
  }

  saveReclamention(){
   console.log(this.reclamention)
    this.reclamentionService.addReclamention(this.reclamention).subscribe(data=>{
      console.log(data)
    })
    this.reclamentionService.getReclamention(this.id).subscribe(data=>{
      this.reclamentions = data;
     })
  }
  voirReclamention(id:number){
    this.reclamentions.forEach(data=>{
       if(data.idReclamention == id)
      { 
        this.reclamention = data
      
        return ;
      }
       
    })
   
  }
}
