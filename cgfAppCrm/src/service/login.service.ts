import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { format } from 'url';
import { formatDate } from '@angular/common';
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
  url="http://localhost:8080/"
  private login:boolean=false;
  private username:string
  commissioncgf=0;
  commissionTotalcgf=0;
  pourcentage=0
  operations:any[]=null
  constructor(private http:HttpClient) {
    
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
    return this.username
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
  getOrdreUser(){
    let url1=this.url+"user/getOrdreBycomm?username="+this.username;
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
  getCommissionByCommercial(username:string){
    
     let urlc = this.url+"user/getCommissionByCommercial?username="+username
     return this.http.get(urlc).pipe(
       map((data:number)=>data)
     )
  }
  getCourtageCgf(){
    let url1 = this.url+"user/getCourtage"
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
}
