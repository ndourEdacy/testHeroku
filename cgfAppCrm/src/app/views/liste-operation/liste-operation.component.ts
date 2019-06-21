import { Component, OnInit } from '@angular/core';
import { LoginService } from 'service/login.service';
import { Router } from '@angular/router';
import { ClientService } from 'service/client.service';

@Component({
  selector: 'app-liste-operation',
  templateUrl: './liste-operation.component.html',
  styleUrls: ['./liste-operation.component.scss']
})
export class ListeOperationComponent implements OnInit {
   operations:any[]=null
   operation:any
   op:any[]=[]
   nombreOrde = 0
   nombreOrdeWeb=0
   client:any
  constructor(private loginService:LoginService,private router:Router,private clientService:ClientService) {
        
        this.nombreOrdeWeb = this.getNombreOrdeWeb()
   }

  ngOnInit() {
    this.operations = this.loginService.getoperation()
    this.loginService.setopera(this.operations)
  
        this.nombreOrde = this.operations.length
  }

  getNombreOrdeWeb(){
    let i=0
    this.operations = this.loginService.getoperation()
      this.operations.forEach(o=>{
        if(o.agence.match('WEB'))
          i++
      })

      return i;
  }

  filterParOdreExecute()
  {
    this.op=[]
      this.operations = this.loginService.getopera()
      console.log(this.operations)
        this.operations.forEach(o=>{
            if(o.quantite == o.quantiteExecute && o.typeOrde.match('BLA')==null)
              this.op.push(o)
        })

      // console.log("----------------",this.op)
        this.loginService.setoperation(this.op)
        this.operations = this.loginService.getoperation();
        this.nombreOrdeWeb = this.getNombreOrdeWeb()
        this.nombreOrde = this.operations.length
     //   console.log("----------------",this.operations)
  }

    
    filterParOdreExecutePartiellement(){

        let opExP:any[]=[]
        this.operations = this.loginService.getopera()
          this.operations.forEach(o=>{
              if(o.quantite != o.quantiteExecute && o.typeOrde.match('BLA')===null &&  o.quantiteExecute!=0)
                     opExP.push(o)
            })
            this.loginService.setoperation(opExP)
            this.operations = this.loginService.getoperation();
            this.nombreOrdeWeb = this.getNombreOrdeWeb()
            this.nombreOrde = this.operations.length
    }

    filterParOdreNonExecute(){
      
      let opExP:any[]=[];
      this.operations = this.loginService.getopera()
      this.operations.forEach(o=>{
        if(o.quantite != o.quantiteExecute && o.typeOrde.match('BLA')===null && o.quantiteExecute==0)
           opExP.push(o)
        })
        this.loginService.setoperation(opExP)
        this.operations = this.loginService.getoperation();
        this.nombreOrdeWeb = this.getNombreOrdeWeb()
        this.nombreOrde = this.operations.length
    }
    getOrdreById(id:number){
          this.operation = this.operations.find(p=>p.idOrdre ==id);
          this.getclient(this.operation.numCompte)
    }
    getclient(numcpt:number)
    {
        this.clientService.getClientByNumCpt(numcpt).subscribe(data=>{
            this.client = data;
        })
    }
}
