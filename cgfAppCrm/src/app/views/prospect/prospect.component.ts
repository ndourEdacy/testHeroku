import { Component, OnInit } from '@angular/core';
import { ProspectService } from 'service/prospect.service';

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrls: ['./prospect.component.scss']
})
export class ProspectComponent implements OnInit {

  constructor(private prospectService:ProspectService) { 
    console.log(prospectService.getAllProspect())
  }

  ngOnInit() {
  }

}
