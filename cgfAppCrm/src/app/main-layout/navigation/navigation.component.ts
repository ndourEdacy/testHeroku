import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from 'service/login.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;

  clicked: boolean;
  username:string
  constructor(private userService:LoginService) {
    this.clicked = this.clicked === undefined ? false : true;
    this.username = userService.getUserName()
  }

  ngOnInit() {
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

}
