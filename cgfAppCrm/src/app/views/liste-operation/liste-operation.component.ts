import { Component, OnInit } from '@angular/core';
import { LoginService } from 'service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-operation',
  templateUrl: './liste-operation.component.html',
  styleUrls: ['./liste-operation.component.scss']
})
export class ListeOperationComponent implements OnInit {
   operations:any[]=null
   op:any[]=[]
   nombreOrde = 0;
   nombreOrdeWeb=0
  constructor(private loginService:LoginService,private router:Router) {
        this.operations = loginService.getoperation()
        this.nombreOrde = this.operations.length
        this.nombreOrdeWeb = this.getNombreOrdeWeb()
   }

  ngOnInit() {
  }
  filterParOdreExecute(){
   
    let ops = this.loginService.getoperation()
    console.log(ops)
    this.operations.forEach(o=>{
        if(o.quantite == o.quantiteExecute && o.typeOrde.match('BLA')===null)
           this.op.push(o)
    })
    
    
    this.operations = this.op
    this.nombreOrdeWeb = this.getNombreOrdeWeb()
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
    filterParOdreExecutePartiellement(){
      let opExP:any[]=[]
     this.operations = this.loginService.getoperation()
      this.operations.forEach(o=>{
        if(o.quantite != o.quantiteExecute && o.typeOrde.match('BLA')===null &&  o.quantiteExecute!=0)
           opExP.push(o)
        })
        this.operations = opExP
        this.nombreOrdeWeb = this.getNombreOrdeWeb()
        this.nombreOrde = this.operations.length
    }

    filterParOdreNonExecute(){
      let opExP:any[]=[]
      this.operations = this.loginService.getoperation()
      this.operations.forEach(o=>{
        if(o.quantite == o.quantiteExecute && o.typeOrde.match('BLA')===null && o.quantiteExecute!=0)
           opExP.push(o)
        })
        this.operations = opExP
        this.nombreOrdeWeb = this.getNombreOrdeWeb()
        this.nombreOrde = this.operations.length
    }
}
