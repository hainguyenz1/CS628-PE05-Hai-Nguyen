const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

const uri = "mongodb+srv://hainguyen29100:Hai29102001@pe05.qfrcg.mongodb.net/?retryWrites=true&w=majority&appName=PE05";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  instructions: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// CORS Configurations
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type'], // Allowed headers
};
app.use(cors(corsOptions));

app.use(express.json());

// API routes

// GET /api/recipes (Get all recipes)
app.get('/api/recipes', async (req, res) => {
  console.log("GET /api/recipes request received"); // Debugging: Check if route is reached
  try {
    const recipes = await Recipe.find();
    console.log("Recipes found:", recipes); // Debugging: Check the data
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /api/recipes/:id (Get a specific recipe)
app.get('/api/recipes/:id', async (req, res) => {
  console.log("GET /api/recipes/:id request received for ID:", req.params.id); // Debugging
  try {
    const recipe = await Recipe.findById(req.params.id);
    console.log("Recipe found:", recipe); // Debugging
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST /api/recipes (Add a new recipe)
app.post('/api/recipes', async (req, res) => {
  console.log("POST /api/recipes request received:", req.body); // Debugging
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    console.log("Recipe saved:", savedRecipe); // Debugging
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT /api/recipes/:id (Update a recipe)
app.put('/api/recipes/:id', async (req, res) => {
    console.log("PUT /api/recipes/:id request received for ID:", req.params.id);
    console.log("Request body:", req.body);
  try {
    const recipeId = new mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true, runValidators: true });
    console.log("Updated recipe:", updatedRecipe);
    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE /api/recipes/:id (Delete a recipe)
app.delete('/api/recipes/:id', async (req, res) => {
    console.log("DELETE /api/recipes/:id request received for ID:", req.params.id);
  try {
    const recipeId = new mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    console.log("Deleted recipe:", deletedRecipe);
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));