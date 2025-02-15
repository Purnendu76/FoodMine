import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
const VALIDATORS_MESSAGE:any={
  required:'should not be empty',
  Email:'Email should not valid!!',
  minlength:'Field is too short',
  notMatch:'password & confirm does nor match'
}
@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent  implements OnInit,OnChanges{

  @Input()
  control!:AbstractControl;
  @Input()
  showErrorWhen:boolean=true
  @Input()
  errorMessages:string[]=[]

  constructor(){}
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {
     this.control.statusChanges.subscribe(()=>{
      this.checkValidation();
     })

     this.control.valueChanges.subscribe(()=>{
      this.checkValidation();
     })
  }

  checkValidation(){
     const errors =this.control.errors;
     if(!errors){
      this.errorMessages=[];
      return;
     }
     const errorKeys=Object.keys(errors);
     this.errorMessages=errorKeys.map(key =>VALIDATORS_MESSAGE[key])
     
  }
}
