import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrManager } from 'ng6-toastr-notifications';


@Injectable({
  providedIn: 'root'
})
export class AlerteService {

 url="http://localhost:8080/";
  constructor(private http:HttpClient ,private loginservice:LoginService,private toastr: ToastrManager) { 
    this.url = loginservice.url;
  }
  saveAlerte(alerte){
    let urla=this.url+"alerte/save"
    return this.http.post(urla,alerte).pipe(
      map(data=>data)
    )
  }
  getAlerteById(id){
    const urla = this.url+"alerte/getOne/"+id;
    return this.http.get(urla).pipe(
      map((data:any)=>data)
    )
  }
  getaAlerteByUsername(username:string){
    let urla = this.url+"alerte/notificationAlerte?username="+username;
    return this.http.get(urla).pipe(
      map((data:any)=>data)
    )
  }

  public getTitreAction(){
    let urla = this.url+"titre/getAllTitreAction"
    return this.http.get(urla).pipe(
      map((data:any[])=>data)
    )
  }
  showSuccess(message:string) {
    console.log(message)
    this.toastr.successToastr(message, 'Success!',);
  }

  showError() {
      this.toastr.errorToastr('This is error toast.', 'Oops!');
  }

  showWarning() {
      this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  showInfo(message:string) {
      this.toastr.infoToastr(message, 'Info',{position : 'bottom-right',animate: 'slideFromBottom'});
  }

  showCustom() {
      this.toastr.customToastr('Custom Toast', null, { enableHTML: true });
  }

  showToast(position: any = 'top-left') {
      this.toastr.infoToastr('This is a toast.', 'Toast', { position: position });
  }
  // successmsg(){
  //   this.toastr.success("Toastr Success message",'Success')
  // }
  // errorsmsg(){
  //   this.toastr.error("Toastr Error Notification",'Error')

  // }
  // infotoastr()
  // {
  //   this.toastr.info("Important News", 'Information');
  // }
  // toastrwaring()
  // {
  //   this.toastr.warning("Battery about to Die", 'Warning');
  // }
}
