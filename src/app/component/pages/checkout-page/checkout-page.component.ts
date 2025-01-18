import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shread/models/order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent  implements OnInit{

  order:Order= new Order()
  checkoutForm!: FormGroup;
  constructor(cartService:CartService, private formBuilder:FormBuilder, private userService:UserService,private tostService:ToastrService){
    const cart =cartService.getCart();
    this.order.totalPrice =cart.totalPrice;
  }
  ngOnInit(): void {
    let { name,address}= this.userService.currentUser;
    this.checkoutForm=this.formBuilder.group({
      name:[name , Validators.required],
      address:[address,Validators.required]
    })
  }

  get fc(){
    return this.checkoutForm.controls;
  }
  creatOrder(){
    if(this.checkoutForm.invalid){
      this.tostService.warning("please fill the inputs","invalid inputs");
      return ;
    }
    this.order.name =this.fc.name.value;
    this.order.address=this.fc.address.value;
    console.log(this.order);
  }
 
  

}
