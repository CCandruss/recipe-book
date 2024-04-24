import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";

@Injectable({providedIn: 'root'})//this is necessary if another service will be injected into this one
export class RecipeStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService
  ) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://udemy-recipes-8b774-default-rtdb.firebaseio.com/recipes.json',
      recipes)
      .subscribe(response => {
        console.log(response)
      })
  }

  fetchRecipes() {
    this.http.get<Recipe[]>(
      'https://udemy-recipes-8b774-default-rtdb.firebaseio.com/recipes.json',
    )
      .pipe(map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
        }),
      )
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes)
        return recipes
      });
  }
}
