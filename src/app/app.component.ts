import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {RecipeStorageService} from "./shared/recipe-storage.service";
import {RecipeService} from "./recipes/recipe.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private recipeStorage: RecipeStorageService,
    private recipeService: RecipeService
  ) {
  }

  ngOnInit() {
    this.authService.autoLogin()

    if (this.recipeService.getRecipes().length < 1) {
      this.recipeStorage.fetchRecipes()
    }
  }
}
