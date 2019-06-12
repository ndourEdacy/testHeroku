import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AdminServiceService, commercial } from 'app/admin-service.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public map: any = { lat: 51.678418, lng: 7.809007 };
  public chart1Type: string = 'bar';
  public chart2Type: string = 'pie';
  public chart3Type: string = 'line';
  public chart4Type: string = 'radar';
  public chart5Type: string = 'doughnut';

  private tabMoi = ["01","02","03","04","05","06","07","08","09","10","11","12"]
  public chartType = 'line';
  private dataAchat: number[] = [];
  private dataVente: number[] = [];
  private dataSubs: number[] = [];
  private dataOuuverturCompte: number[] = [];
  private dataCourtage: number[] = [];
  isDataAvailable = false;
  public loading = false;
  public chartDatasetsCourtage: Array<any> = [
    {data: this.dataCourtage, label: '#courtage du moi'}

  ];
  public chartDatasets: Array<any>= [
    {data: this.dataVente, label: '#vente'},
    {data: this.dataAchat, label: '#achat'},
    {data: this.dataSubs, label: '#subscription'}
  ];
  public chartDatasetAchat: Array<any> = [
    {data: this.dataAchat, label: '#achat'}

  ];
  public chartDatasetVente: Array<any> = [
    {data: this.dataVente, label: '#vente'}

  ];
  public chartDatasetSubscription: Array<any> = [
    {data: this.dataSubs, label: '#subscription'}

  ];

  public chartDatasetsOuvertureCompte: Array<any> = [
    {data: this.dataOuuverturCompte, label: '#compte ouvert'}
 ];
  public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Au' , 'Sep' , 'Oct' , 'Nov' , 'Dec'] ;

  public chartColors: Array<any> = [

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
  nomComplet="";prenom="";date:any
  username:string
  montantAchat=0
  montantVente=0
  montantSubscription=0
  montantAchatTotal=0
  montantVenteTotal=0
  montantSubscriptionTotal=0
  montantPortefeuille=0
  montantLiquidite=0
  commissioncgf=0;
  commissionTotalcgf:number;
  pourcentage=0
  operations:any[]=null
  alertes:any[]=[]
  clientCh:any[]=[]
  numcli=0;
  courtageWeb=0
  courtageAgent=0
  public commercials:commercial[]
  nombreOrdreTotalPasse=0
 nombreCompteCreeInThisYear=0;
  nombreTotaleDeCompte=0;
  courtageOuvertureCompte=0;
  anneEnCours= "2019"
  retraitEspece=0;
  retraitCheque=0;
  depotEspece=0;
  depotCheque=0;
  depotVirement =0;
  retraitVrement = 0;
  constructor(private adminService:AdminServiceService,private router:Router){

    this.getCourtageByMonth(this.anneEnCours);
    console.log(new Date().getFullYear())
     

  }
  
  ngOnInit() {
    this.montantAchat = this.adminService.getmontantAchat();
    this.montantVente = this.adminService.getmontantVente();
    this.montantSubscription = this.adminService.getmontantSubscription();
    this.montantAchatTotal = this.adminService.getmontantAchat();
    this.commissionTotalcgf = this.adminService.getcommissionTotale();
    this.courtageAgent = this.adminService.getcommissionAgence();
    this.courtageWeb = this.adminService.getcommissionweb();
    this.dataAchat = this.adminService.getdataAchat();
    this.dataVente = this.adminService.getdataVente();
    this.dataSubs = this.adminService.getdataSubs();
   
    
   
   this.adminService.getNombreTotaleDeCompte().subscribe(data=>{
     this.nombreTotaleDeCompte = data
   });
   
    this.adminService.getPortefeuilleGlobale("2019-05-15").subscribe(data=>{
        this.montantLiquidite = data[0];
        this.montantPortefeuille = data[1];
        
    });
  // this.adminService.getLiquidite().subscribe(data=>{
  //   this.montantLiquidite = data
  // })
      // if(this.courtageAgent == 0){
      //   this.adminService.getCourtageAgence("2018").subscribe(data=>{
      //     this.courtageAgent = data
      //     this.adminService.setcommissionAgence(this.courtageAgent)
      //   })
    // }


                 
  this.getData(this.anneEnCours);



      this.adminService.getAllCommercial().subscribe(data=>{

          this.commercials = data;
          this.adminService.setCommercials(this.commercials);

          for(let i=0 ; i < this.commercials.length ; i++)
          {
                  this.adminService.getPortefeuille(this.commercials[i].username).subscribe(data=>{
                          this.commercials[i].liquidite = data[0];
                          this.commercials[i].portefeuille = data[1];
                  });
          }

          this.adminService.setCommercials(this.commercials)

     })

  }

  getStatiqueOperationDecaisse(date){
    this.adminService.getStatiqueOperationDecaisse(date).subscribe(data=>{
       
        this.depotEspece = data[1];
        this.retraitCheque = data[2];
        this.depotCheque = data[3]
        this.depotVirement = data[4];
        this.retraitVrement = data[5];
    })
  }
  async getCourtageByMonth(year){
    return await  this.adminService.getCoutateByMouths(year).subscribe(data=>{
                      this.dataCourtage = data
                    console.log(data)
                    this.chartDatasetsCourtage[0].data = data;
                });
  }
  getCourtageByMoi(even){
    this.getCourtageByMonth(even);
  }
  
  getData(date) {
    this.montantAchatTotal=0;
    this.montantVenteTotal=0;
    this.montantSubscriptionTotal =0;

    this.getStatiqueOperationDecaisse(date);

        this.adminService.getNombreCompteCreateByMontn(date).subscribe(data => {
          this.dataOuuverturCompte = data;
          this.chartDatasetsOuvertureCompte = [
          {data: this.dataOuuverturCompte, label: '#compte ouvert'}
              
            ];
        });


        this.adminService.nombreOrdreTotalPasse(date).subscribe(data => {
          this.nombreOrdreTotalPasse = data[0]
        })


    this.adminService.getCourtageOuvertureCompte(date).subscribe(data => {
      this.courtageOuvertureCompte = data
    });

    // a change
    this.adminService.getNombreClientCreateInThisYear(date).subscribe(data=>{
    this.nombreCompteCreeInThisYear = data
    });

            this.adminService.getCourtageCgf(date).subscribe(data=>{

              this.commissionTotalcgf = data

              this.adminService.setcommissionTotale(this.commissionTotalcgf)
            });

            this.adminService.getMontantOrdre(date).subscribe(data=>{

              if( data != undefined)
                this.isDataAvailable = true;

              this.dataAchat = data[0];

              this.dataVente = data[1];

              this.dataSubs = data[2];

              this.chartDatasets= [
                {data: this.dataVente, label: '#vente'},
                {data: this.dataAchat, label: '#achat'},
                {data: this.dataSubs, label: '#subscription'}
              ];

              this.chartDatasetAchat = [
                {data: this.dataAchat , label: '#achat'}
              ];
              this.chartDatasetVente = [
                { data: this.dataVente, label: '#vente'}
              ];
              this.chartDatasetSubscription =[
                {data: this.dataSubs , label: '#subscription'}
              ];
           console.log(this.dataAchat)

              for(let i = 0 ; i < this.dataVente.length ; i++)
              {
                this.montantAchatTotal+=this.dataAchat[i];
                this.montantVenteTotal+=this.dataVente[i];
                this.montantSubscriptionTotal += this.dataSubs[i];
              }
              this.adminService.setmontantAchat(this.montantAchatTotal);
              this.adminService.setmontantVente(this.montantVenteTotal);
              this.adminService.setmontantSubscription(this.montantSubscriptionTotal);
              this.adminService.setdataAchat(this.dataAchat);
              this.adminService.setdataSubs(this.dataSubs);
              this.adminService.setdataVente(this.dataVente);


        });
  }

  loadStaticByYear(year){
    this.getData(year);
  }
  async getCourtage(){
  //   this.adminService.getCourtageWeb().subscribe(data=>{

  //     this.courtageWeb = data;
  //  })
   // this.courtageWeb = await this.adminService.getCourtageWeb().toPromise()
      this.adminService.setcommissionweb(this.courtageWeb)

  }
  voirProfilCommercial(username: string) {
        this.router.navigate(["commercial", username])
  }
  creeCompteParAn(even){
    this.adminService.getNombreCompteCreateByMontn(even).subscribe(data=>{
      this.dataOuuverturCompte = data;
      this.chartDatasetsOuvertureCompte= [
       {data: this.dataOuuverturCompte, label: '#compte ouvert'},
       ];
    })
    this.adminService.getNombreClientCreateInThisYear(even).subscribe(data=>{
      this.nombreCompteCreeInThisYear = data
    })
    this.anneEnCours = even;
  }
  chartClicked(){

  }
}
