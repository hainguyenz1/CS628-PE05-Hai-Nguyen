import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/recipes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (recipes.length === 0) {
    return <div>No recipes found.</div>;
  }

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;