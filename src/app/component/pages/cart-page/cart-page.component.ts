import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shread/models/Cart';
import { CartItem } from 'src/app/shread/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!:Cart
   constructor(private cartService:CartService){
     this.cartService.getCartObservable().subscribe((cart)=>{
       this.cart=cart
     })
      
   }
  ngOnInit(): void {
  }
  removeFromCaer(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.id)
  }
  changeQuentity(cartItem:CartItem,quantityinString:string){
    const quantity =parseInt(quantityinString);
    this.cartService.changeQuentity(cartItem.food.id,quantity);
  }

}
