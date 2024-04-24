import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit, OnDestroy{
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {}

  ngOnInit() {
    // if(this.recipeService.getRecipes().length < 1){
    //   let storedRecipes = localStorage.getItem('recipes')
    //   this.recipesLocal = JSON.parse(storedRecipes)
    //   console.log(this.recipesLocal)
    // }

    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null; //true if paramId is not equal to null
          this.initForm();
        }
      );
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit(){
    if(this.editMode){
      // const newRecipe = new Recipe(this.recipeForm.value['name'],
      //   this.recipeForm.value['description'],
      //   this.recipeForm.value['imagePath'],
      //   this.recipeForm.value['ingredients']);
      this.recipeService.updateRecipe(this.id, this.recipeForm.value) //this will do the same as the above commented out code because
    }else {//our reactive form is structured with the same values as a type recipe
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      let recipes: Recipe [] = this.recipeService.getRecipes()
      if(recipes.length < 1){
        let localRecipes = localStorage.getItem('recipes')
        recipes = JSON.parse(localRecipes)
      }
      const recipe = recipes[this.id]
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }))
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
