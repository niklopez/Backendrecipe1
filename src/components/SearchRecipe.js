import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
function SearchRecipe({ addCourse }) {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const handleSearch = () => {
    // Fetch recipes from the MealDB API based on the search term
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the recipes state with the fetched data
        setRecipes(data.meals);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  };
  const handleIngredientSearch = () => {
    // Fetch recipes from the MealDB API based on the main ingredient search term
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the recipes state with the fetched data
        setRecipes(data.meals);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  };
  const handleTitleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleRecipeClick = (recipe) => {
    // Set the selected recipe when it is clicked
    setSelectedRecipe(recipe);
  };
  useEffect(() => {
    // Fetch and display random recipes when the component mounts
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.meals);
      })
      .catch((error) => {
        console.error('Error fetching random recipes:', error);
      });
  }, []); // Empty dependency array to run this effect only once when the component mounts
  return (
    <div>
      <TextField
        id="searchTerm"
        autoFocus
        fullWidth
        label="Search Term"
        name="searchTerm"
        value={searchTerm}
        onChange={handleTitleChange}
      />
      <Button
        id="searchRecipe"
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleSearch}
      >
        Search Recipe
      </Button>
      <Button
        id="searchIngredient"
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleIngredientSearch}
      >
        Search By Main Ingredient
      </Button>
      {/* Display the fetched recipes */}
      {recipes.map((recipe) => (
        <div key={recipe.idMeal} style={{ marginBottom: 20 }}>
          <h3 onClick={() => handleRecipeClick(recipe)}>{recipe.strMeal}</h3>
          {/* Conditionally render additional details for the selected recipe */}
          {selectedRecipe && selectedRecipe.idMeal === recipe.idMeal && (
            <div>
              <p>Instructions: {recipe.strInstructions}</p>
              <p>Ingredients: {recipe.strIngredient1}, {recipe.strIngredient2}, ...</p>
            </div>
          )}
          <img src={`${recipe.strMealThumb}/preview`} alt={recipe.strMeal} style={{ maxWidth: '100%' }} />
          <a href={`${recipe.strMealThumb}/preview`} target="_blank" rel="noopener noreferrer">
            Add /preview
          </a>
        </div>
      ))}
    </div>
  );
}
// No need for addCourse in propTypes since it's not used in the component
SearchRecipe.propTypes = {};
export default SearchRecipe;



















