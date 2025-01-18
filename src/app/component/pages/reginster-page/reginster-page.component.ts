import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shread/interfaces/IUserRegester';
import { PasswordsMatchValidator } from 'src/app/shread/validators/password_match_validator'; 

@Component({
  selector: 'app-reginster-page',
  templateUrl: './reginster-page.component.html',
  styleUrls: ['./reginster-page.component.css']
})
export class ReginsterPageComponent implements OnInit {
 regiesterForm!:FormGroup;
 isSubmitted =false;
returnUrl='';
constructor( private formBuilder:FormBuilder, private userService:UserService,private activatedRoute:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.regiesterForm =this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(5)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]],
      confirmPassword:['',[Validators.required]],
      address:['',[Validators.required,Validators.minLength(10)]]
    },{
      Validators:PasswordsMatchValidator('password','confirmPassword')
    });
     this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl;
  }

 get fc(){
  return this.regiesterForm.controls;
 }

 submit(){
  this.isSubmitted=true;
  if(this.regiesterForm.invalid)return;
  const fv =this.regiesterForm.value;
  const user:IUserRegister={
    name: fv.name,
    email: fv.email,
    password: fv.password,
    confirmPassword: fv.confirmPassword,
    address: fv.address
  };
  this.userService.register(user).subscribe(_ =>{
    this.router.navigateByUrl(this.returnUrl)
  })
 }
}
