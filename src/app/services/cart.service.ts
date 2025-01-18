import { Injectable } from '@angular/core';
import { Cart } from '../shread/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shread/models/food';
import { CartItem } from '../shread/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private cart:Cart=this.getCartFromLocalStroge()
private  cartSubject:BehaviorSubject<Cart>= new BehaviorSubject (this.cart) 
  constructor() { }
  addToCart(food:Food):void{
    let cartItem=this.cart.items.find(item=>item.food.id===food.id)
     if(cartItem)
      return;
    this.cart.items.push(new CartItem(food));
    this.setCartFoodLocalStroge() 
  }
  removeFromCart(foodId:string):void{
    this.cart.items=this.cart.items.filter(item=>item.food.id !=foodId)
    this.setCartFoodLocalStroge() 

  }
  changeQuentity(foodId:string,quentity:number){
    let cartItem=this.cart.items.find(item =>item.food.id===foodId);
    if(!cartItem)return;

    cartItem.quantity=quentity
    cartItem.price=quentity*cartItem.food.price
    this.setCartFoodLocalStroge() 

  }
  clearCart(){
    this.cart=new Cart()
    this.setCartFoodLocalStroge() 

  }
  getCartObservable():Observable<Cart>{
     return this.cartSubject.asObservable();
  }
  getCart():Cart{
    return this.cartSubject.value;
  }
  private setCartFoodLocalStroge():void{
    this.cart.totalPrice =this.cart.items.reduce((prevsum,currenItem)=>prevsum + currenItem.price,0);
    this.cart.totalCount=this.cart.items.reduce((prevSum,currenItem)=> prevSum+currenItem.quantity,0)
    const cartjson =JSON.stringify(this.cart)
    localStorage.setItem('cart',cartjson);
    this.cartSubject.next(this.cart)


  }
  private getCartFromLocalStroge():Cart{
    const cartjson =localStorage.getItem('cart');
    return cartjson? JSON.parse(cartjson):new Cart();
  }
}
