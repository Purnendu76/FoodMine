import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/pages/home/home.component';
import { FoodPageComponent } from './component/pages/food-page/food-page.component';
import { CartPageComponent } from './component/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './component/pages/login-page/login-page.component';
import { ReginsterPageComponent } from './component/pages/reginster-page/reginster-page.component';
import { CheckoutPageComponent } from './component/pages/checkout-page/checkout-page.component';
import { authGuard } from './auth/gurds/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    canActivate:[authGuard]
    
  },
  {
    path:'search/:searchTerm',
    component:HomeComponent
  },
  {
    path:'tag/:tag',
    component:HomeComponent
  },
  {
    path:'food/:id',
    component:FoodPageComponent
  },
  {
    path:'cart-page',
    component:CartPageComponent
  },
  {
    path:'login',
    component:LoginPageComponent
  },
  {
    path:'register',
    component:ReginsterPageComponent
  },
  {
    path:'checkout',
    component:CheckoutPageComponent,
    // canActivate:[authGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
