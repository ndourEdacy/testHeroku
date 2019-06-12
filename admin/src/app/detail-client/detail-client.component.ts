
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'app/client.service';
import { OrdreService } from 'app/ordre.service';
// import { ClientService, Titre } from 'service/client.service';
// import { NoteService } from 'service/note.service';
// import { OperationService } from 'service/operation.service';
// import { TacheService } from 'service/tache.service';
// import { OrdreService } from 'service/ordre.service';
// import { LoginService } from 'service/login.service';
// import { UploadFileServiceService } from 'app/upload-file-service.service';
// import { HttpEventType, HttpResponse } from '@angular/common/http';
// import { ReclamentionService } from 'service/reclamention.service';
// import { AlerteService } from 'service/alerte.service';
// import { NgxSpinnerService } from 'ngx-spinner';
export interface Phonning{
  descriptionPhonning:string
  dureePhoning:number
  useCreateAt:string
}
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

  taches:any[]=[];
 reclamention={
  "numCompte":0,
  "usernameCom":"",
  "description":"",
  "statut":"",
  "degresDaccomplisement":0,
  "dateReclamention":""
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
    dateDebut:Date,
    dateFin:Date,
    descriptionTache:"",
    sujet:"",
    statut:"active",
    priorite:"medium",
    numclientRatacher:0,
    assignerA:"",
    userCreat:""
   }

    note:any[]=[]
    client={
      "clientId":0,
      "numCompt":0,
      "nom":"",
      "dateNaiss":"",
      "phone":"",
      "cni":"",
      "email":""
    }
    portefeuilleClient={
      "portefeuille":0,
      "liquidite":0
    }
    operations:any[]=[]
   // titre:any[]=[]
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
      alerte={
        "codeTitre":"SNTS",
        "prixDujour":"",
        "operationAlerte":"==",
        "valeurDujour":"",
        "dateValide":"",
        "typeOp":"AA",
        "quantite":0,
        "username":"",
        "numCompte":0
      };
      alertes:any[]=[]
      anneEnCour="2019";
      phonning={
          descriptionPhonning:"",
          dureePhoning:0,
          useCreateAt:"",
          numCompte:0
      }
      phonnings:any[]=[];
      retraitEspece=0;
      retraitCheque=0;
      depotEspece=0;
      depotCheque=0;
      depotVirement=0;
      retraitVrement=0;
  constructor(private router:ActivatedRoute,private clientservice:ClientService,private ordreService:OrdreService) {

              
            
                    this.router.params.forEach(param=>{
                      this.id=param.id;

                    })

                    // this.reclamentionService.getReclamention(this.id).subscribe(data=>{
                    //   this.reclamentions = data;
                    // })
                    //get client
                  this.clientservice.getClientByNumCpt(this.id).subscribe(data=>{
                      this.client=data
                     
                  })

                  //get portrfeuille
                  this.clientservice.getPortefeuilleClientByNumcompte(this.id).subscribe(data=>{
                        this.portefeuilleClient=data
                       
                  })

                 

                  clientservice.getAllNote(this.id).subscribe(data=>{
                       this.notes=data
                  })

                  clientservice.setIdCleint(this.id)

                  // tacheService.getTacheByNumCpt(this.id).subscribe(data=>{

                  //     this.taches = data;

                  // })

                  this.getStatiqueOperationDecaisse(this.anneEnCour,this.id);
  }

  getStatiqueOperationDecaisse(date,num){
    this.clientservice.getStatistiqueByDateByNumcompteByTypeTransanction(date,num).subscribe(data=>{
        this.retraitEspece = data[0];
        this.depotEspece = data[1];
        this.retraitCheque = data[2];
        this.depotCheque = data[3];
        this.depotVirement = data[4];
        this.retraitVrement = data[5];
    })
  }
  // savePhonning(){
  //   this.phonning.useCreateAt = this.loginservice.getUserName()
  //   this.phonning.numCompte = this.id,
  //   this.phonnings.push(this.phonning);
  //   console.log(this.phonnings)
  //    this.clientservice.savePhonning(this.phonning).subscribe(data=>console.log(data))
  // }
  creeCompteParAn(even){
          this.anneEnCour = even;
         // this.spinner.show();
         
          this.dataAchat=[];
          this.dataVente=[];
          this.dataSubs=[];
          this.montantAchat=0
          this.montantSubscription=0
          this.montantVente=0
          this.clientservice.getMontantOperationByMonth(this.id,this.anneEnCour).subscribe(data=>{

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
         // this.spinner.hide();

      });
      this.ordreService.getOrdreByNumCpt(this.id,this.anneEnCour).subscribe(data=>{
        for(let i=0 ; i < data.length ; i++)
        {

            data[i].nomTitre =   this.clientservice.getNomTitre(data[i].codeTitre)

        }
          console.log(data)
           this.operations=data;
      });
      this.getStatiqueOperationDecaisse(this.anneEnCour,this.id);

  }
  rattacherDocument(even){
     even.preventDefault()
  }

  ngOnInit() {
    this.creeCompteParAn(this.anneEnCour);
      this.clientservice.getCouetage(this.id).subscribe(data=>{
          this.courtagecgf = data
      })
    
  }
  getAllTitreAction(){
    // this.alerteService.getTitreAction().subscribe(data=>{
    //   this.alertes = data
    //   console.log(data)
    // });
  }
  getOrdreById(idordre:number){
    this.operations.forEach(data=>{
      if(data.idOrdre == idordre)
      {
        this.operation=data
      }
    })
  }
  modifier(id:number){
  // this.route.navigate(["modifClient/",id])
  }

  ajouterNote(id:number){
    this.clientservice.setIdCleint(id)
     // this.route.navigate(["note"])
  }
  ajouterTache(id:number)
  {
   //  this.route.navigate(["tache",id])
  }
  voirProfil(idclient:Number){
  // this.route.navigate(["profil/",idclient])
  }

  chercherTache(){
    //this.taches=this.tacheService.getTache(this.dateDebutTache)
  }
  detailPortefeuille(numcpt:number)
  {
   //this.spinner.show();
    this.clientservice.detailPortefeuille(numcpt).subscribe(data=>{

         if(data != null){

              for(let i=0 ; i < data.length ; i++)
              {

                  data[i].nomTitre =   this.clientservice.getNomTitre(data[i].codeTitre)

              }
              this.titre = data
             

         }
       //  this.spinner.hide();

    })
  }

  selectFile(event) {
    this.progress.percentage = 0;
    this.selectedFiles = event.target.files;
  }

  upload() {
      // this.progress.percentage = 0;

      // this.currentFileUpload = this.selectedFiles.item(0);
      // this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      //   if (event.type === HttpEventType.UploadProgress) {
      //     this.progress.percentage = Math.round(100 * event.loaded / event.total);
      //   } else if (event instanceof HttpResponse) {
      //     console.log('File is completely uploaded!');
      //   }
      // });

      // this.selectedFiles = null;
  }

  ajouterReclamention(id:number){
    // this.loginservice.getAllUser().subscribe(data=>{
    //   this.users = data
     
    // })
    // this.reclamention.usernameCom = this.loginservice.getUserName();
    // this.reclamention.numCompte = this.id
  }

  saveReclamention(){

    // this.reclamentionService.addReclamention(this.reclamention).subscribe(data=>{
    
    // })
    // this.reclamentionService.getReclamention(this.id).subscribe(data=>{
    //   this.reclamentions = data;
    //  })

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
  modifTache(idtache:number){
    this.tache = this.taches.find(t=>t.idTache==idtache)
  }

  ajouterAlert(){
    // this.alerte.username = this.loginservice.getUserName();
    // this.alerte.numCompte = this.id
    // this.alerteService.saveAlerte(this.alerte).subscribe(data=>{
     
    // })
  }

  voirPlusTache(){

  }

}
