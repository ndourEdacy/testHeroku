import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AdminServiceService } from "app/admin-service.service";

@Injectable()
export class CommercialService{
    url = '';


  constructor(private http: HttpClient, private adminService: AdminServiceService) {
    this.url = adminService.getUrl();
  }

  ordreByMoi(username: string,date)
  {
    let url1 = this.url + "ordre/getMontantOpByMonth/"+date+"?username="+username
    return this.http.get(url1).pipe(
      map(data=>data)
    );
  }

  getCourtageCgf(){
    let url1 = this.url+"user/getCourtage"
    return this.http.get(url1).pipe(
      map((data:number)=>data)
    )
  }

   getCommissionByCommercial(username:string,date)
   {

      let urlc = this.url+"user/getCommissionByCommercial/"+date+"?username="+username

      return this.http.get(urlc).pipe(
                map((data:number)=>data)
             )
  }

  public getNomClientCreatAtComm(username){

     let url1 = this.url+"getClientCreateTotalByComm?username="+username

     return this.http.get(url1).pipe(
       map((data:number)=>data)
     )

  }
}
