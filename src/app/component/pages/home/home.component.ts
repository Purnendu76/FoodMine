import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shread/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  foods: Food[] = [];

  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) {
    let foodsObservable:Observable<Food[]>
    this.activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        foodsObservable = this.foodService.getAllfoodSearchTerm(params['searchTerm']);
      } else if(params.tag)
        foodsObservable=this.foodService.getAllFoodsByTag(params.tag)
      else {
        foodsObservable = this.foodService.getAll();
      }
      foodsObservable.subscribe((serverFood)=>{
        this.foods=serverFood
      })
    });
  }
}
