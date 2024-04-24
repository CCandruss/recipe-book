import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

import {RecipeStorageService} from "../shared/recipe-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private recipeStorageService: RecipeStorageService, private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
    })
  }

  onLogout(){
    this.authService.logout()
  }

  onSaveData(){
    this.recipeStorageService.storeRecipes()
  }

  onFetchData(){
    this.recipeStorageService.fetchRecipes()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
