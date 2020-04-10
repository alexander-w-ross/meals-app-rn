import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";

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

    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFreen) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: updatedFilteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;
