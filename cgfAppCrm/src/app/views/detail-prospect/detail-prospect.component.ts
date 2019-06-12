import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProspectService } from 'service/prospect.service';

@Component({
  selector: 'app-detail-prospect',
  templateUrl: './detail-prospect.component.html',
  styleUrls: ['./detail-prospect.component.scss']
})
export class DetailProspectComponent implements OnInit {
  id:number
  prospect:any
  constructor(private router:ActivatedRoute,private prospectService:ProspectService) { 
   
    router.params.forEach(param=>{
        this.id = param.id
    })

    this.prospect = prospectService.getProspectById(this.id)
    console.log(this.prospect)
  }

  ngOnInit() {
  }

}
