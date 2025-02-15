import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS}from '@angular/common/http'
import{ReactiveFormsModule}from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/partials/header/header.component';
import { HomeComponent } from './component/pages/home/home.component';
import { SearchComponent } from './component/partials/search/search.component';
import { TagsComponent } from './component/partials/tags/tags.component';
import { FoodPageComponent } from './component/pages/food-page/food-page.component';
import { CartPageComponent } from './component/pages/cart-page/cart-page.component';
import { TitleComponent } from './component/partials/title/title.component';
import { NotFoundComponent } from './component/partials/not-found/not-found.component';
import { LoginPageComponent } from './component/pages/login-page/login-page.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputContainerComponent } from './component/partials/input-container/input-container.component';
import { InputValidationComponent } from './component/partials/input-validation/input-validation.component';
import { TextInputComponent } from './component/partials/text-input/text-input.component';
import { DeafaultButtonComponent } from './component/partials/deafault-button/deafault-button.component';
import { ReginsterPageComponent } from './component/pages/reginster-page/reginster-page.component';
import { LoadingComponent } from './component/partials/loading/loading.component';
import { LoadingService } from './services/loading.service';
import { LoadingInterceptor } from './shread/interceptor/loading.interceptor';
import { CheckoutPageComponent } from './component/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './component/partials/order-items-list/order-items-list.component';
import { MapComponent } from './component/partials/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DeafaultButtonComponent,
    ReginsterPageComponent,
    LoadingComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
    
    
  
  
    
    
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
