import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { Session } from 'protractor';

const HttpUploadOptions = {
  headers: new HttpHeaders({ 
    "Content-Type": "multipart/form-data  boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" ,
    'cache-control': 'no-cache'
  })
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url="http://192.168.0.114:8090/cgfapp/"
  //url="http://localhost:8080/"
  private login:boolean=false;
  private username:string
  commissioncgf=0;
  commissionTotalcgf=0;
  pourcentage=0
  operations:any[]=null
  opera:any[]=null;
  dataAchat:any[]=null;
  dataSubs:any[]=null;
  dataVente:any[]=null;
  constructor(private http:HttpClient) {
    
   }
   getdataAchat(){
     return this.dataAchat;
   }
   setdataAchat(n){
    this.dataAchat = n;
   }

   getdataSubs(){
    return this.dataSubs;
  }
  setdataSubs(n){
   this.dataSubs = n;
  }

  getdataVente(){
    return this.dataVente;
  }
  setdataVente(n){
   this.dataVente = n;
  }

  getcommissionTotalcgf(){
    return this.commissionTotalcgf
  }
  setcommissionTotalcgf(com:number){
    this.commissionTotalcgf=com
  }
  getcommissioncgfByComm(){
    return this.commissioncgf
  }
  setCommBycomm(com:number){
    this.commissioncgf = com
  }
  getpourcentage(){
    return this.pourcentage
  }
  setpourcentage(p:number){
    this.pourcentage = p
  }
  getUserName()
  {
    return sessionStorage.getItem("username")
  }

  getSessionStaorage(){
    
  }

  getuser(username:string,password:string){
    this.username = username
    let url1=this.url+"user/getUser?username="+username+"&&password="+password
    
     return  this.http.get(url1)
  }
    
    getAllUser(){
     
      let url1=this.url+"user/getAll"
      
      return  this.http.get(url1).pipe(
        map((data:any[])=>data)
      )
    }
    getoperation(){
      return this.operations;
    }
    setoperation(operations){
      this.operations = operations
    }
  getOrdreUser(username,date){
    let url1=this.url+"ordre/getOrdreByCommercial/"+date+"?username="+username;
    return  this.http.get(url1).pipe(
              map((data:any[])=>data)
             )
  }
  getCommissionCgfByAchat()
  {
    let url1=this.url+"/ordre/getOrdreByTypeOrdre?typeordre=aa";
    return  this.http.get(url1)
  }
  getLogin(){
    return this.login
  }
  setlogin(l:boolean){
    this.login = l;
  }
  getcommm()
  {
    let url =this.url+"getCommissionCgfByAchat";
    return this.http.get(url)
  }
  getCommissionByCommercial(username:string,date:string){
    
     let urlc = this.url+"user/getCommissionByCommercial/"+date+"?username="+username
     return this.http.get(urlc).pipe(
       map((data:number)=>data)
     )
  }
  getCourtageCgf(date){
    let url1 = this.url+"getCourtageByDateAction/"+date
    return this.http.get(url1).pipe(
      map((data:number)=>data)
    )
   }
   uploadFile(d:File){
     
    const formData = new FormData();
    formData.append('file',d)
     let urldoc=this.url+"uploadFile?file="+d
     return this.http.post(urldoc,formatDate,HttpUploadOptions)
   }
   getopera(){
     return this.opera;
   }
   setopera(op:any[]){
     this.opera = op
   }
   setUsername(user:string){
     this.username = user
   }

   public getNomClientCreatAtComm(username,date){
    
      let url1 = this.url+"getClientCreateByComm/"+date+"?username="+username

      return this.http.get(url1).pipe(
        map((data:number)=>data)
      )

   }
   
   public getTop10Portefeuille(username:string){
      let url1=this.url+"/portefeuille/getTop10portefeuilleByCommercial?username="+username;
      return this.http.get(url1).pipe(
        map((data:any[])=>data)
      )
   }
   public getTop10LiquiditeByCommercial(username:string){
    let url1=this.url+"/portefeuille/getTop10LiquiditeByCommercial?username="+username;
    return this.http.get(url1).pipe(
      map((data:any[])=>data)
    )
   }

   public getStaticOperationDeCaisseByCommercial(date:string){
     let urlc = this.url+"getStatiqueOperationDeCaisseByUsercommercial/"+date+"?username="+this.getUserName();
     return this.http.get(urlc).pipe(
       map((data:number[])=>data)
     )
   }
  
  
getMontantPortefeuille(username:string){
  let url1=this.url+"montantPortefeuilleByCommercial?username="+username
  return  this.http.get(url1)
}

// getLastTransactionByUsername(username){
//   let urlu = this.url+"/getLastTransactionByUsername?username="+username;

//   return this.http.get(urlu).pipe(
//     map((data:Transaction[])=>data)
//   )
// }
}
