import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shread/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
 tags?:Tag[];
  constructor(foodService:FoodService){
 foodService.getAllTags().subscribe((serverTagse)=>{
  this.tags=serverTagse;
 });
  }
}
