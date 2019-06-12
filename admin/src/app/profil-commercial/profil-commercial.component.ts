import { Component, OnInit } from '@angular/core';
import { CommercialService } from 'services/commercial-service';
import { AdminServiceService, commercial } from 'app/admin-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil-commercial',
  templateUrl: './profil-commercial.component.html',
  styleUrls: ['./profil-commercial.component.scss']
})
export class ProfilCommercialComponent implements OnInit {
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

  public chartDatasetsOrdre: Array<any>= [
    {data: this.dataVente, label: '#subscription'},

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


  isDataAvailable=false;
  cni=""
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
  operations:any[]=null
  alertes:any[]=[]
  clientCh:any[]=[]
  numcli=0;
  com={
    "portefeuille":0,
    "liquidite":0,
    "nom":"",
    "prenom":"",
    "email":""
  }

  commercial:any
  public ctx;
  public gradientFill;
  public chartColor;
  public lineBigDashboardChartColors:Array<any>;

  nombreOdre:number
  nombreOdreWeb:number
  nombreOdreExecute:number
  nombreOdreExecutepart:number
  nombreOdreNonExecute:number
  nombreCompteCreer=0;
  anneEnCour="2019"
  nombreTotaleDeCompte=0;
  depotEspece = 0;
 retraitCheque = 0;
  depotCheque =0;
 depotVirement = 0;
 retraitVrement = 0;
  constructor(private commService:CommercialService,private adminService:AdminServiceService,private route:ActivatedRoute) {

    route.params.forEach(param=>{
         this.username = param["id"]
    })

    //   this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    //   this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");
    this.lineBigDashboardChartColors = [
          {
            backgroundColor: this.gradientFill,
            borderColor: this.chartColor,
            pointBorderColor: this.chartColor,
            pointBackgroundColor: "#2c2c2c",
            pointHoverBackgroundColor: "#2c2c2c",
            pointHoverBorderColor: this.chartColor,
          }
        ]
        this.getStatic();

  }

  ngOnInit() {
     this.commService.getNomClientCreatAtComm(this.username).subscribe(data=>{
       this.nombreCompteCreer = data
     })

       this.montantAchat = 0;
       this.montantVente = 0;
       this.montantSubscription = 0;
    this.montantAchat = this.adminService.getmontantAchat();
     

    this.dateByYear(this.anneEnCour)


          this.commService.getCourtageCgf().subscribe(data=>{
            this.commissionTotalcgf = data
            //this.loginservice.setcommissionTotalcgf(this.commissionTotalcgf)

        })

          this.com = this.adminService.getCommercialByUsername(this.username)

          this.commService.getCommissionByCommercial(this.username,this.anneEnCour).subscribe(data=>{
            this.commissioncgf = data
          //  this.loginservice.setCommBycomm(this.commissioncgf)
            this.pourcentage =  this.commissioncgf/this.commissionTotalcgf *100
            //this.loginservice.setpourcentage(this.pourcentage)
          })
          this.adminService.getNombreTotaleDeCompte().subscribe(data=>{
            this.nombreTotaleDeCompte = data
          });
          
          
      

  }

  dateByYear(anne)
  {
        this.commService.ordreByMoi(this.username,anne).subscribe(data=>{

          this.chartColor = "#FFFFFF";
          this.dataAchat= data[0];
          this.dataVente=data[1];
          this.dataSubs=data[2];

          this.chartDatasets= [
            {data: this.dataVente, label: '#vente'},
            {data: this.dataAchat, label: '#achat'},
            {data: this.dataSubs, label: '#subscription'}
          ];
        this.isDataAvailable = true
          this.chartDatasetsOrdre= [
            {data: this.dataVente, label: '#vente'},

          ]
          for(let i=0 ; i < this.dataAchat.length ; i++){
            this.montantAchat+=this.dataAchat[i]
            this.montantSubscription+=this.dataSubs[i]
            this.montantVente+=this.dataVente[i]
          }
         
      });

      this.adminService.getStaticByCommercial(this.username,anne).subscribe(data=>{

          this.nombreOdre = data[0]

          this.nombreOdreExecute = data[1]

          this.nombreOdreWeb = data[2]

          this.nombreOdreExecutepart = data[3]

          this.nombreOdreNonExecute = data[4]

      });
      this.getStatic();
      
  }

  getStatic(){
    this.adminService.getStaticOperationDeCaisseByCommercial(this.anneEnCour,this.username).subscribe(data=>{
      this.depotEspece = data[1];
      this.retraitCheque = data[2];
      this.depotCheque = data[3];
      this.depotVirement = data[4];
      this.retraitVrement = data[5];
    })
  }

}
