import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Recipe not found');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditRecipe({ ...recipe });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editRecipe),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedRecipe = await response.json();
      setRecipe(updatedRecipe);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating recipe:", error);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        navigate('/recipes');
      } catch (error) {
        console.error("Error deleting recipe:", error);
        setError(error.message);
      }
    }
  };

  const handleEditChange = (e) => {
    setEditRecipe({ ...editRecipe, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="recipe-details">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input type="text" name="name" value={editRecipe.name} onChange={handleEditChange} required /><br />
          <textarea name="ingredients" value={editRecipe.ingredients} onChange={handleEditChange} required /><br />
          <textarea name="instructions" value={editRecipe.instructions} onChange={handleEditChange} required /><br />
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <h2>{recipe.name}</h2>
          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;