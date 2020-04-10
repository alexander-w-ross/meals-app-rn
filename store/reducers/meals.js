import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      //case where meal is already in favoriteMeals
      if (existingIndex >= 0) {
        // make a copy of current state of fav meals
        const updatedFavMeals = [...state.favoriteMeals];
        // remove meal from fav meals array
        updatedFavMeals.splice(existingIndex, 1);
        //return updated fav meals array
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        // find meal that we fav
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        // return updated state of fav meals with new meal
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }

    default:
      return state;
  }
};

export default mealsReducer;
