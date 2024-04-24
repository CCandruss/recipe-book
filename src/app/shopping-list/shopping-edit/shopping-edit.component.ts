import {
  Component, OnDestroy,
  OnInit, ViewChild,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe( (index:number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      })
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    if(this.editMode === true){
      this.slService.editIngredient(this.editedItemIndex, value.name, value.amount)
      this.editMode = false;
      this.slForm.reset()
    } else {
      const newIngredient = new Ingredient(value.name, value.amount);
      this.slService.addIngredient(newIngredient);
      this.slForm.setValue({name: null, amount: null})
    }
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
