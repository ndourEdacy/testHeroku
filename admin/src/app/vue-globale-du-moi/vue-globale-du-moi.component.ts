import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'app/admin-service.service';

@Component({
  selector: 'app-vue-globale-du-moi',
  templateUrl: './vue-globale-du-moi.component.html',
  styleUrls: ['./vue-globale-du-moi.component.scss']
})
export class VueGlobaleDuMoiComponent implements OnInit {
  public chart1Type:string = 'bar';
  public chart2Type:string = 'pie';
  public chart3Type:string = 'line';
  public chart4Type:string = 'radar';
  public chart5Type:string = 'doughnut';

  private tabMoi=["01","02","03","04","05","06","07","08","09","10","11","12"]
  public chartType = 'line';
  private dataAchat:number[]=[];
  private dataVente:number[]=[];
  private dataSubs:number[]=[];
  private dataOuuverturCompte:number[]=[]
  isDataAvailable=false
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
    {data: this.dataSubs, label: '#subscription'},
    {data: this.dataSubs, label: '#subscription'}

  ];

  public chartDatasetsOuvertureCompte: Array<any>= [
    {data: this.dataOuuverturCompte, label: '#compte ouvert'},
    
  ];
  public chartLabels: Array<any> = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];

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
 
  nombreOrdreTotalPasse=0
 nombreCompteCreeInThisYear=0;
  nombreTotaleDeCompte=0;
  courtageOuvertureCompte=0;
  anneEnCours="2019-01"
  annee="2019"
  moi="01"
  retraitEspece=0;
  retraitCheque=0;
  depotEspece=0;
  depotCheque=0;
  retraitVirement=0;
  depotvirement=0;
  constructor(private adminService:AdminServiceService) { }

  ngOnInit() {
    this.donneDuMoi(this.anneEnCours);
    this.adminService.getPortefeuilleGlobale(this.anneEnCours).subscribe(data=>{
      this.montantLiquidite = data[0];
       this.montantPortefeuille = data[1];
      
       
   });
    
  }
  getStatiqueOperationDecaisse(date){
    this.adminService.getStatiqueOperationDecaisse(date).subscribe(data=>{
        this.retraitEspece = data[0];
        this.depotEspece = data[1];
        this.retraitCheque = data[2];
        this.depotCheque = data[3]
        this.depotvirement = data[4];
        this.retraitVirement = data[5];
       
    });
  }
  filtreMoi(even){
    this.moi=even
    this.anneEnCours =this.annee+"-"+this.moi;
    this.donneDuMoi(this.anneEnCours);
  }
  filtreAn(even){
    this.annee=even
    this.anneEnCours =this.annee+"-"+this.moi;
    this.donneDuMoi(this.anneEnCours);
  }

  donneDuMoi(date){
    this.adminService.getCourtageOuvertureCompte(date).subscribe(data=>{
      this.courtageOuvertureCompte = data
    })

    this.adminService.getCourtageCgf(date).subscribe(data=>this.commissionTotalcgf=data);

    this.getStatiqueOperationDecaisse(date)

        this.adminService.getNombreClientCreateInThisYear(date).subscribe(data=>{
          this.nombreCompteCreeInThisYear = data
        })
       this.adminService.getMontantOdresByMonthAndYeran(date).subscribe(data=>{

                  if( data != undefined)
                  this.isDataAvailable = true;


                  this.dataAchat= data[0];

                  this.dataVente=data[1];

                  this.dataSubs=data[2];

                  this.chartDatasets= [
                    {data: this.dataVente, label: '#vente'},
                    {data: this.dataAchat, label: '#achat'},
                    {data: this.dataSubs, label: '#subscription'}
                  ];

                  this.chartDatasetAchat[0].data = this.dataAchat;
                  this.chartDatasetVente[0].data = this.dataVente;
                  this.chartDatasetSubscription[0].data = this.dataSubs;
                //  this.chartDatasetSubscription[1].data = this.dataAchat

                  for(let i =0 ; i < this.dataVente.length ; i++)
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
}
