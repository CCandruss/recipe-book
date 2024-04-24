import { Component, OnInit } from '@angular/core';
import {RecipeStorageService} from "../shared/recipe-storage.service";
import {RecipeService} from "./recipe.service";


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  constructor(private recipeStorage: RecipeStorageService,
              private recipeService: RecipeService) {}

  ngOnInit() {
    if(this.recipeService.getRecipes().length < 1){
      this.recipeStorage.fetchRecipes()
    }
    this.recipeService.recipesChanged.subscribe( (recipes) => {
      localStorage.setItem('recipes', JSON.stringify(recipes))
    })
  }

}
