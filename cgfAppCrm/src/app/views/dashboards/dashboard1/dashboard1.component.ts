import { Component, OnInit, OnDestroy } from '@angular/core';
import { TacheService } from 'service/tache.service';
import { NoteService } from 'service/note.service';
import { Tache } from 'models/tache';
import { ClientService } from 'service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'models/user';
import { OrdreService } from 'service/ordre.service';
import { LoginService } from 'service/login.service';
import { log } from 'util';
import { AlerteService } from 'service/alerte.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { alerte } from 'models/alerte';
import { Note } from 'models/note';
import { Transaction } from 'models/transaction';
import { NotificationService } from 'service/notification.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component implements OnInit, OnDestroy {

  public map: any = { lat: 51.678418, lng: 7.809007 };
  public chart1Type:string = 'bar';
  public chart2Type:string = 'pie';
  public chart3Type:string = 'line';
  public chart4Type:string = 'radar';
  public chart5Type:string = 'doughnut';

  private tabMoi=["01","02","03","04","05","06","07","08","09","10","11","12"]
  public chartType = 'line';
  private dataAchat:any[]=[];
  private dataVente:any[]=[];
  private dataSubs:any[]=[];
  public chartDatasets: Array<any>= [
    {data: this.dataVente, label: '#vente'},
    {data: this.dataAchat, label: '#achat'},
    {data: this.dataSubs, label: '#souscription'}
  ];
  public chartDatasets1: Array<any> = [
    {data: [15000500, 40000000, 60000000, 51000000, 56000000, 55000000, 40000000, 60000000, 60002000, 50000000, 50020000], label: '#portefeuille'}
    
  ];
  public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul','Au','Sep','Oct','Nov','Dec'];

  public chartColors:Array<any> = [

  ];

  public dateOptionsSelect: any[];
  public bulkOptionsSelect: any[];
  public showOnlyOptionsSelect: any[];
  public filterOptionsSelect: any[];
   
  taches:any[]=[];
  notes:Note[]=[];

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

  tache={
    idTache:0,
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
  
  
  anneEnCour="2019"
  cni=0
  nomComplet="";prenom="";date:any
  username:string
  montantAchat=0
  montantVente=0
  montantSubscription=0
  montantPortefeuille=0
  montantLiquidite=0
  commissioncgf=0;
  commissionTotalcgf=0;
  pourcentage=0
  operations:any[]=[]
  alertes:any[]=[]
  allTitre:any[]=[];
  clientCh:any[]=[]
  numcli=0;
  nombreClientCree=0;
  retraitEspece=0;
  retraitCheque=0;
  depotEspece=0;
  depotCheque=0;
  depotVirement = 0;
  retraitVrement = 0;
  matricule = 0;
  alerte = {
    "codeTitre":"SNTS",
    "prixDujour":"",
    "operationAlerte":"==",
    "valeurDujour":"",
    "datavalid":Date,
    "typeOp":"AA",
    "quantite":0,
    "username":"",
    "numCompte":0
  };
  note={
    "idNote":0,
    "sujet":String,
    "description":"",
    "clientId":0,
    "isChecked":false,
    "dateCreat":"",
    "numCompte":0,
    "userCreate":"",
    "nomClient":""
  };
  clientNotfound = true;
  transactions:Transaction[] = []
  
  constructor(private tacheService:TacheService,private noteService:NoteService,private clientservice:ClientService,private router:Router,
     private htpp:HttpClient,private ordreService:OrdreService,private route:ActivatedRoute,private loginservice:LoginService,
     private alerteService:AlerteService,private spinner: NgxSpinnerService,private notificationservice:NotificationService){
    
      this.username = sessionStorage.getItem("username")
      
         if(this.username == undefined)
           router.navigate(["login"])
          // route.params.subscribe(param=>{
          //   this.username=param['username']
          // });
        

          noteService.getsNotes(this.username).subscribe(data=>{
                this.notes = data
                for(let i=0 ; i < this.notes.length ; i++){
                    clientservice.getClientByNumCpt( this.notes[i].numCompte).subscribe(data=>{
                      if(data != null || data.nom != null)
                        this.notes[i].userClient = data.nom;
                    })
                }
               
          });
          tacheService.getAllTache(this.username).subscribe(data=>{
            this.taches = data
            console.log(this.taches)
          });

        this.loginservice.getMontantPortefeuille(this.username).subscribe(data=>{
              this.montantLiquidite=data[0]
              this.montantPortefeuille=data[1]
        });
 
       alerteService.getaAlerteByUsername(this.username).subscribe(data=>{
            this.alertes = data
       });

       loginservice.getLastTransactionByUsername(this.username).subscribe(data=>{
         this.transactions = data;
       });
      
      //  this.notificationservice.getTacheAfaire(this.username).subscribe(data=>{
      //   this.taches = data;
      //  // if(this.taches != null)
      //   //alerteService.showInfo();
      // })

      this.notificationservice.getAlerteDuJour(this.username).subscribe(data=>{
          this.alertes = data;
           if(this.alertes != null)
            alerteService.showInfo('votre alerte du jour est activé !!!');
      });
       this.dataAchat = this.loginservice.getdataAchat();
       this.dataVente = this.loginservice.getdataVente();
       this.dataSubs = this.loginservice.getdataSubs();
  }
  ngOnDestroy() {
    // ...
  }
  ngOnInit() {
    

    this.operations = this.loginservice.getoperation()
    
        this.loginservice.getNomClientCreatAtComm(this.username,this.anneEnCour).subscribe(data=>{
          this.nombreClientCree = data;
        });
       
      this.loginservice.getOrdreUser(this.username,this.anneEnCour).subscribe(data=>{
          
          this.operations = data
          
          this.loginservice.setoperation(this.operations)
        
      })

     this.alerteService.getaAlerteByUsername(this.username).subscribe(data=>{
          this.alertes = data
         
     })
    

    this.commissioncgf=this.loginservice.getcommissioncgfByComm();
    this.commissionTotalcgf = this.loginservice.getcommissionTotalcgf()
    this.pourcentage = this.loginservice.getpourcentage()
   


    if(this.dataAchat== null || this.dataVente== null || this.dataSubs== null)
    {
      this.spinner.show();
      this.ordreService.ordreByMoi(this.username,this.anneEnCour).subscribe(data=>{
        this.spinner.hide();
          this.dataAchat= data[0];
          this.loginservice.setdataAchat(this.dataAchat);

          this.dataVente=data[1];
          this.loginservice.setdataVente(this.dataVente);

          this.dataSubs=data[2];
          this.loginservice.setdataSubs(this.dataSubs);
          console.log(this.dataAchat)
          this.getdata()
         
      });
    }
    else{
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
      console.log("else con")
      console.log(this.dataAchat)
    }
        
    // if(this.commissioncgf == 0){
    //   this.loginservice.getCommissionByCommercial(this.loginservice.getUserName(),this.anneEnCour).subscribe(data=>{
    //     this.commissioncgf = data
    //     this.loginservice.setCommBycomm(this.commissioncgf)
    //     this.pourcentage =  this.commissioncgf/this.commissionTotalcgf *100
    //     this.loginservice.setpourcentage(this.pourcentage)
    //   })
    // }
   
    if(this.commissionTotalcgf == 0){
      this.loginservice.getCourtageCgf(this.anneEnCour).subscribe(data=>{
        this.commissionTotalcgf = data
        this.loginservice.setcommissionTotalcgf(this.commissionTotalcgf)
      });
    }
    this.loginservice.getStaticOperationDeCaisseByCommercial(this.anneEnCour).subscribe(data=>{
        this.depotEspece = data[1];
        this.retraitCheque = data[2];
        this.depotCheque = data[3];
        this.depotVirement = data[4];
        this.retraitVrement = data[5];
    })
   
   // this.pourcentage =  this.commissioncgf/this.commissionTotalcgf *100
  }
  
  getalert(id){
     this.alerteService.getAlerteById(id).subscribe(data=>{
         this.alerte = data
     })
  }
  getdata(){
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
  }
  operationByDate(even){
   
      this.loginservice.getCourtageCgf(even).subscribe(data=>{
        this.commissionTotalcgf = data
        this.loginservice.setcommissionTotalcgf(this.commissionTotalcgf)
        
     })
    
    this.spinner.show();
    this.loginservice.getNomClientCreatAtComm(this.username,even).subscribe(data=>{
      this.nombreClientCree = data;
    })
        this.ordreService.ordreByMoi(this.username,even).subscribe(data=>{
          this.montantAchat=0
          this.montantSubscription=0
          this.montantVente=0

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
            this.spinner.hide();
        });
        this.loginservice.getOrdreUser(this.username,even).subscribe(data=>{
         
          this.operations = data
           
          this.loginservice.setoperation(this.operations)
        
        })

        this.loginservice.getStaticOperationDeCaisseByCommercial(even).subscribe(data=>{
          this.depotEspece = data[1];
          this.retraitCheque = data[2];
          this.depotCheque = data[3];
          this.depotVirement = data[4];
          this.retraitVrement = data[5];
      })
  }
    modifTache(id){
      
      this.tacheService.getTacheById(id).subscribe(data=>{
        this.tache = data;
        console.log(data)
      });

     
    }

    modifier(f){
      //console.log(f)
      this.tacheService.modifierTache(f).subscribe(data=>{
        console.log(data);
        this.tacheService.getAllTache(this.username).subscribe(data=>{
          this.taches = data
          this.alerteService.showSuccess('Tache modifié avec succés');
        });
      });
      
    }

    chercher(){
     this.clientservice.findClientCgfByNumCompte(this.cni).subscribe(data=>{
       this.cni = parseInt(data.numcompte);
    this.clientservice.getClientByNumCpt(this.cni).subscribe(data=>{
            if(data == null){
              this.clientNotfound = false;
              this.router.navigate(["/clientNotFoundComponent"]);
            }
            else{
              this.clientNotfound = true;
              console.log("true")
              this.clientservice.recherche(this.cni);
            }
          })
     });

     
    }

    chercheByName(){
      this.clientservice.chercherClientByName(this.nomComplet).subscribe(data=>{
               this.clientCh = data;
             if( this.clientCh.length == 1 )
               this.router.navigate(["/profileClient",this.clientCh[0].cptNoCli])
       
      })
    }
    
    profileClient(){
      //  if(this.clientCh.length ==1)
      this.router.navigate(["/profileClient",this.numcli])
    }
    ajouterMeeting(){
     this.router.navigate(["note"])
    }

    ajouterTache(){
      this.router.navigate(["tache",0]);
    }
    modifnote(id){
      this.noteService.getNoteId(id).subscribe(data=>{
        this.note = data;
       this.clientservice.getClienByNumcpt(this.note.numCompte).subscribe(data=>{
            this.note.nomClient = data.nom
        })
        console.log(this.note);
      });
    }
    getuser(){
      let url="http://localhost:8080/user/getUser?username=ndour&&password=123"
      
     return  this.htpp.get(url)
    }
    addUser(){
      let url1="http://localhost:8080/user/addUser"
        let user={
          nom:"ndour",
          prenom:"baila",
          username:"ndourbaila",
          password:"123",
          cni:"11111",
          role:"",
          email:"ndourbaila92@gmail.com"
        }
      return this.htpp.post<User>(url1,user)
      .pipe(
        
      );;
    }
  getMontantPortefeuille(username:string){
    let url="http://localhost:8080/user/getAllMontantPortefeuilleByCommercial?username="+username
    return  this.htpp.get(url)
  }
   getMontantByMoi(){
    
     this.ordreService.ordreByMoi(this.username,this.anneEnCour).subscribe(data=>{
           this.dataAchat= data[0];
           this.dataVente=data[1];
           this.dataSubs=data[2];

           
        })
      
    }
    voirPlusOperation(){
      this.operations = this.loginservice.getoperation();
      this.router.navigate(["listeOperation"])
    }

    getAllTitreAction(){
      this.alerteService.getTitreAction().subscribe(data=>{
        this.allTitre = data
        console.log(data)
      });
    }

    ajouterAlert(){
     
      this.alerte.username = this.loginservice.getUserName();
      this.alerte.numCompte = 0
      this.alerteService.saveAlerte(this.alerte).subscribe(data=>{
        this.alerteService.showSuccess('Alerte ajouter avec succés');
      })
    }

    modifierNote(note){
      console.log(note);
      // this.clientservice.addNote(note).subscribe(data=>{
      //   console.log(data)
      // });
      this.noteService.modifNote(note).subscribe(data=>{
        this.noteService.getsNotes(this.username).subscribe(data=>{
          this.notes = data
          this.alerteService.showSuccess('Note modifié avec succés');
       });
      })
    }
}
