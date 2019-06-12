import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { httpFactory } from '@angular/http/src/http_module';
export class commercial{
  "username":""
  "prenom":""
  "nom":""
  "portefeuille":number
  "liquidite":number
  "email":""
}
@Injectable()
export class AdminServiceService {
//url="http://192.168.0.114:8090/cgfapp/";
url = 'http://localhost:8080/';
commercials: commercial[]
montantAchat: number = 0
montantVente: number = 0
montantSubscription: number=0
commissionAchat:number=0
commissionVente:number=0
commissionTotale:number=0
commissionweb:number=0
commissionAgence:number=0
 dataAchat:number[]=[];
 dataVente:number[]=[];
 dataSubs:number[]=[];

 public getUrl() {
  return this.url;
 }
public getdataAchat() {
     return this.dataAchat;
}
public getdataVente(){
     return this.dataVente;
}
public getdataSubs() {
     return this.dataSubs
}
public setdataAchat(val: number[]) {
  this.dataAchat = val;
}
public setdataVente(val: number[]) {
   this.dataVente = val;
}
public setdataSubs(val: number[]) {
   this.dataSubs = val
}


public getcommissionAchat() {
  return this.commissionAchat;
}
public getcommissionAgence() {
  return this.commissionAgence;
}
public getcommissionweb() {
  return this.commissionweb
}
public getcommissionTotale() {
     return this.commissionTotale;
}

public getcommissionVente() {
     return this.commissionVente;
}
public getmontantSubscription() {
     return this.montantSubscription;
}
public getmontantVente() {
     return this.montantVente;
}
public getmontantAchat(){
     return this.montantAchat ;
}


public setcommissionAchat(val:number){
     this.commissionAchat = val;
}
public setcommissionAgence(val:number){
     this.commissionAgence = val;
}
public setcommissionweb(val:number){
     this.commissionweb = val;
}
public setcommissionTotale(val:number){
     this.commissionTotale = val;
}

public setcommissionVente(val:number){
     this.commissionVente = val;
}
public setmontantSubscription(val:number){
     this.montantSubscription = val;
}
public setmontantVente(val:number){
     this.montantVente = val;
}
public setmontantAchat(val:number){
     this.montantAchat = val;
}
  constructor(private http:HttpClient) { }

  public getCommercials(){
     return this.commercials;
  }

  public setCommercials(c:commercial[]){
    this.commercials=c;
  }

  public getCommercialByUsername(username:string){

    if(this.commercials.length != 0){

       for(let i=0 ; i < this.commercials.length ; i++){

           if(this.commercials[i].username == username)
              return this.commercials[i];
       }

     }
     return null;

  }

  public getAllCommercial(){
    let urla = this.url+"getAllCommercial"
    return this.http.get(urla).pipe(
      map((data:commercial[])=>data)
    );
  }

  public getPortefeuille(username:string){

  //  let urlp =this.url+"montantPortefeuilleByCommercial?username="+username
    const urlp = this.url + 'portefeuillejj/getPortefeuilleduJourByUIsername?username=' + username
    return this.http.get(urlp).pipe(
      map((data: number[]) => data)
    );

  }
  //return un tableau dont indice
  public getMontantOrdre(date) {
    let urlm=this.url+"getMontantOdres/"+date
    return this.http.get(urlm).pipe(
      map(data=>data)
    )
  }

  public getCourtageWeb(date) {

    let urlc = this.url+"getCourtageWeb/"+date;

    return this.http.get(urlc).pipe(
      map((data:number)=>data)
    )

  }

  public getCommercial(username:string) {
    let urlc = this.url+""
  }

  public getCommissionByTypeOrdre(){
     let urlo=this.url+"getCourtageByTypeAchet"

     return this.http.get(urlo).pipe(
       map((data:any[])=>data)
     )
  }


  getCourtageCgf(date) {
    let url1 = this.url+"getCourtageByDateAction/"+date;
    return this.http.get(url1).pipe(
      map((data:number)=>data)
    )
   }

   public getStaticByCommercial(username:string,date) {
     let url1=this.url+"getStaticByCommercial/"+date+"?username="+username

     return this.http.get(url1).pipe(
       map((data:number[])=>data)
     )
   }

   public nombreOrdreTotalPasse(date) {
     let url1 = this.url+"nombreOrdreTotalPasse/"+date

     return this.http.get(url1).pipe(
       map((data:number[])=>data)
     )
   }

   public getCourtageAgence(date) {
        let url1=this.url+"getCourtageAgence/"+date


        return this.http.get(url1).pipe(
          map((data:number)=>data)
        )
   }

   public getPortefeuilleGlobale(date) {
     let dateSys = new Date();
    // let date = dateSys.getFullYear()+"-"+dateSys.getUTCMonth()+"-"+dateSys.getDay();
    //let date ="2018-12-31"
     console.log(date)
    // let url1 = this.url+"valorisationportefeuilleDuJour/"+date;
     let url1 = this.url + 'portefeuillejj/valorisationPortefeuilleDuJour/';

     return this.http.get(url1).pipe(
       map((data:number[])=>data)
     )
   }

  public getNombreClientCreateInThisYear(date) {
    let url1 = this.url+"getNombreClientCreateInThisYear/"+date;

    return this.http.get(url1).pipe(
      map((data:number)=>data)
    )
  }

  public getNombreTotaleDeCompte() {
    let url1 = this.url+"getNombreTotaleDeCompte";

    return this.http.get(url1).pipe(
      map((data:number)=>data)
    )
  }
  public getMontantByTypeAchet(){
      let url1= this.url+"getMontantByTypeAchet";

      return this.http.get(url1).pipe(
        map((data:number[])=>data)
      )
  }

  public getLiquidite(){
    let urlL =this.url+"getLiquidite";
    return this.http.get(urlL).pipe(
      map((data:number)=>data)
    )
  }

  public getCourtageOuvertureCompte(date){
    let urlc = this.url+"getCourtageOuvertureCompte/"+date;

    return this.http.get(urlc).pipe(
      map((data:number)=>data)
    );

  }

  public getNombreCompteCreateByMontn(date){
    let url1 =this.url+"getNombreCompteCreateByMontn/"+date;

    return this.http.get(url1).pipe(
      map((data:number[])=>data)
    );
  }

  public getMontantOdresByMonthAndYeran(date){
    let url1 =this.url+"getMontantOdresByMonthAndYeran/"+date;

    return this.http.get(url1).pipe(
      map((data)=>data)
    );
  }

 public getCoutateByMouths(year){
    let url1 =this.url+"getCoutateByMouths/"+year;

    return this.http.get(url1).pipe(
      map((data:any[])=>data)
    );
  }

  public getStatiqueOperationDecaisse(date) {
    let urls = this.url+"getStatistiqueDuMoi/"+date;
    return this.http.get(urls).pipe(
      map((data:number[])=>data)
    );
  }

  public getStaticOperationDeCaisseByCommercial(date: string,username: string){
    let urlc = this.url+"getStatiqueOperationDeCaisseByUsercommercial/"+date+"?username="+username;
    return this.http.get(urlc).pipe(
      map((data:number[])=>data)
    )
  }
}
