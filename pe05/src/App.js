import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddRecipe from './components/AddRecipe';
import RecipeDetails from './components/RecipeDetails';
import RecipeList from './components/RecipeList';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li><Link to="/">Add Recipe</Link></li>
            <li><Link to="/recipes">Recipe List</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<AddRecipe />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;