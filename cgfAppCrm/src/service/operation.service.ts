import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OperationService {
  operations:any[]=[]
  id=1
  constructor() { }
  operation(o){
  o.idop = this.id++;

    this.operations.push(o);
    
  }

  getOperationByIdCleint(id:number)
  {
    let opClient:any[]=[]
    this.operations.forEach(operation=>{
         if(operation.idClient == id)
         {
           opClient.push(operation)
         }
    });
    return opClient;
  }
}
