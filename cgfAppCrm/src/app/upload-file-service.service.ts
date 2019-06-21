import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileServiceService {
  path = "C:\\Users\\it.dev\\Documents\\NetBeansProjects\\cgd-epargne\\uploads";
  
  constructor(private http: HttpClient) { }
 
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
      
      let urld="http://localhost:8080/getFileNameByClient/18964";

      return this.http.get(urld).pipe(
        map((data:string[])=>data)
      )

    }
  saveDocument(file:File , numclient:number): Observable<HttpEvent<{}>>{
   
    const formdata: FormData = new FormData();
    let urld="http://localhost:8080/uploadFileClient?numclient="+numclient
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
    return this.http.get('/getallfiles');
  }

  downloadFile(filename:string,numCli:number){
    let url="http://localhost:8080/downloadFileClient/"+filename+"?numclient="+numCli

    return this.http.get(url);
  }

  getFilenameByclient(numCli:number){
     let urlc =""
  }

}
