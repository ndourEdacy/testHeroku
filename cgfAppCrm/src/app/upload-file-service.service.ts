import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from 'service/login.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileServiceService {
  url = "http://localhost:8080/"
  constructor(private http: HttpClient, private login:LoginService) {
    this.url = login.url;
   }
 
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
 
    formdata.append('file', file);
 
    const req = new HttpRequest('POST', '/uploadFile', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }
   
    getsFileName(numclient){
      
      let urld=this.url+"getFileNameByClient/18964";

      return this.http.get(urld).pipe(
        map((data:string[])=>data)
      )

    }
  saveDocument(file:File , numclient:number): Observable<HttpEvent<{}>>{
   
    const formdata: FormData = new FormData();
    let urld=this.url+"uploadFileClient?numclient="+numclient
   let doc={
       "numclient":numclient
    }
    formdata.append('file', file);
 
 
    const req = new HttpRequest('POST', urld, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
     return this.http.request(req);
    //return this.http.post(,formdata);
  }


  getFiles(): Observable<any> {
    return this.http.get('getallfiles');
  }

  downloadFile(filename:string,numCli:number){
    let url=this.url+"downloadFileClient/"+filename+"?numclient="+numCli

    return this.http.get(url);
  }

  getFilenameByclient(numCli:number){
     let urlc =""
  }

}
