import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { LoginService } from 'service/login.service';
import { NotificationService } from 'service/notification.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit , OnDestroy{
  @ViewChild('sidenav') sidenav: ElementRef;

  clicked: boolean;
  username:string;
  notif = 0;
  isnotif: boolean;
  constructor(private userService:LoginService,private notificationservice:NotificationService) {
    this.clicked = this.clicked === undefined ? false : true;
    this.username = userService.getUserName()
    this.isnotif =notificationservice.getisVisiteNotification()
   
        notificationservice.getTacheAfaire(this.username).subscribe(data=>{
          this.notif = data.length
        });
    
  }

  ngOnInit() {

  }
  ngOnDestroy() {
    // ...
  }
  setClicked(val: boolean): void {
    this.clicked = val;
  }

}
