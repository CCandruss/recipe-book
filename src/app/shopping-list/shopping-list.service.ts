import {Injectable} from '@angular/core';
import {Subject} from 'rxjs'

import { Ingredient } from '../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(i: number){
    return this.ingredients[i];
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  editIngredient(index: number, newName, newAmount){
    this.ingredients[index] = {
      name: newName,
      amount: newAmount
    }
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredient(i){
    this.ingredients.splice(i,1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
