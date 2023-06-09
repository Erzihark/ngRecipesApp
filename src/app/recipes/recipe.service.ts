import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>

    constructor(private shoppingListService: ShoppingListService){}

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         "Test recipe",
    //         "This is simply a test",
    //         "https://thebrilliantkitchen.com/wp-content/uploads/2023/02/Crockpot-Keto-Meatloaf-1.jpeg.webp",
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French fries', 20),
    //         ]),
    //     new Recipe(
    //         "Another Test recipe",
    //         "This is simply a test",
    //         "https://thebrilliantkitchen.com/wp-content/uploads/2023/02/Crockpot-Keto-Meatloaf-1.jpeg.webp",
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Patty', 1),
    //         ])
    // ];
    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }

    udpateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice())
    }
}