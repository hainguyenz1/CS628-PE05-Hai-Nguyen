import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
  const [recipe, setRecipe] = useState({ name: '', ingredients: '', instructions: '' });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const newRecipe = await response.json();
      console.log('Recipe added:', newRecipe);
      navigate(`/recipes/${newRecipe._id}`);
      setRecipe({ name: '', ingredients: '', instructions: '' });
    } catch (error) {
      console.error('Error adding recipe:', error);
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={recipe.name} onChange={handleChange} required /><br />
        <textarea name="ingredients" placeholder="Ingredients" value={recipe.ingredients} onChange={handleChange} required /><br />
        <textarea name="instructions" placeholder="Instructions" value={recipe.instructions} onChange={handleChange} required /><br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddRecipe;