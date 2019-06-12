import { Component, OnInit } from '@angular/core';
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

export class Dashboard1Component implements OnInit {

  public map: any = { lat: 51.678418, lng: 7.809007 };
  public chart1Type:string = 'bar';
  public chart2Type:string = 'pie';
  public chart3Type:string = 'line';
  public chart4Type:string = 'radar';
  public chart5Type:string = 'doughnut';

  private tabMoi=["01","02","03","04","05","06","07","08","09","10","11","12"]
  public chartType = 'line';
  private dataAchat=[];
  private dataVente=[];
  private dataSubs=[];
  public chartDatasets: Array<any>= [
    {data: this.dataVente, label: '#vente'},
    {data: this.dataAchat, label: '#achat'},
    {data: this.dataSubs, label: '#subscription'}
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
  tache={
     id:0,
     dateDebut:Date,
     dateFin:Date,
     description:"",
     sujet:"",
     statut:"active",
     priorite:"medium",
  };
  
  
  
  cni=""
  nom="";prenom="";date:any
  username:string
  montantAchat=0
  montantVente=0
  montantSubscription=0
  montantPortefeuille=0
  montantLiquidite=0
  commissioncgf=0;
  commissionTotalcgf=0;
  pourcentage=0
  operations:any[]=null
  constructor(private tacheService:TacheService,private noteService:NoteService,private clientservice:ClientService,private router:Router,
     private htpp:HttpClient,private ordreService:OrdreService,private route:ActivatedRoute,private loginservice:LoginService){
    
      this.taches = tacheService.getAllTache();
   
      this.notes = noteService.getAllNote();
      route.params.subscribe(param=>{
        this.username=param['username']
      })
    
    
    this.getMontantPortefeuille(this.username).subscribe(data=>{
          this.montantLiquidite=data[0]
          this.montantPortefeuille=data[1]
    })
   loginservice.getOrdreUser().subscribe(data=>{
      this.operations = data
      loginservice.setoperation(this.operations)
   })
    
  }

  ngOnInit() {
    this.commissioncgf=this.loginservice.getcommissioncgfByComm();
    this.commissionTotalcgf = this.loginservice.getcommissionTotalcgf()
    this.pourcentage = this.loginservice.getpourcentage()
        this.ordreService.ordreByMoi(this.username).subscribe(data=>{
        
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
    if(this.commissioncgf == 0){
      this.loginservice.getCommissionByCommercial(this.loginservice.getUserName()).subscribe(data=>{
        this.commissioncgf = data
        this.loginservice.setCommBycomm(this.commissioncgf)
        this.pourcentage =  this.commissioncgf/this.commissionTotalcgf *100
        this.loginservice.setpourcentage(this.pourcentage)
      })
    }
   
    if(this.commissionTotalcgf == 0){
      this.loginservice.getCourtageCgf().subscribe(data=>{
        this.commissionTotalcgf = data
        this.loginservice.setcommissionTotalcgf(this.commissionTotalcgf)
        
     })
    }
    
   
   // this.pourcentage =  this.commissioncgf/this.commissionTotalcgf *100
  }
    modif(id){
      this.tache = this.tacheService.getTacheById(id);
    }

    modifier(f){
      console.log(f)
      this.tacheService.modifierTache(f);
      this.taches = this.tacheService.getAllTache();
    }

    chercher(){
      this.clientservice.recherche(this.cni)
    }

    chercheByName(){
      this.clientservice.chercherClientByName(this.nom,this.prenom,this.date)
    }

    ajouterMeeting(){
     this.router.navigate(["note"])
    }

    ajouterTache(){
      this.router.navigate(["tache"])
    }
    modifnote(id){
      
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
    
     this.ordreService.ordreByMoi("mlfall").subscribe(data=>{
           this.dataAchat= data[0];
           this.dataVente=data[1];
           this.dataSubs=data[2];

           
        })
      
    }
    voirPlusOperation(){
      this.operations = this.loginservice.getoperation();
      this.router.navigate(["listeOperation"])
    }
   
}
