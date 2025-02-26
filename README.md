# CS628-PE05-Hai-Nguyen
# Recipe Finder Web Application

This document describes the Recipe Finder application in terms of the Input-Process-Output model.

To view recipes in the Recipe List, you must first add them using the "Add Recipe" form.

## Input

The application accepts two primary forms of user input:

1.  **Recipe Data:** Users can input recipe information through the "Add Recipe" form. This includes the recipe's name, ingredients, and instructions. This data is submitted as a JSON object.
2.  **Navigation Requests:** Users interact with the application through navigation links ("Add Recipe," "Recipe List"). These actions determine which component is rendered and which data is fetched or displayed.  Clicking on a recipe in the list provides the recipe's `_id` as input to the details page.

## Process

1.  **Data Submission:** When a user submits a new recipe, the frontend sends a POST request to the backend API (`/api/recipes`). The backend receives this JSON data, validates it (implicitly through the Mongoose schema), and saves it to the MongoDB database. The backend then sends the saved recipe (including the generated `_id`) back to the frontend.
2.  **Data Retrieval:** When a user visits the "Recipe List" page, the frontend sends a GET request to the backend API (`/api/recipes`). The backend retrieves all recipes from the MongoDB database and sends them back to the frontend as a JSON array.  When a user clicks on a recipe in the list, the frontend uses the recipe's `_id` to make a GET request to `/api/recipes/:id`. The backend retrieves the specific recipe and sends it back as JSON.
3.  **Data Display:** The frontend receives data from the backend (either a single recipe or a list of recipes) and renders it in the appropriate components. The "Recipe List" component displays a list of recipe names as clickable links. The "Recipe Details" component displays the full details of a selected recipe.

## Output

The application produces the following outputs:

1.  **Recipe List:** A list of recipe names is displayed on the "Recipe List" page. Each name is a link to the corresponding recipe's details page.
2.  **Recipe Details:** The full details (name, ingredients, and instructions) of a specific recipe are displayed on the "Recipe Details" page.
3.  **User Feedback:** The application provides feedback to the user, such as success messages after adding a recipe, error messages if there are issues with the API requests, and loading indicators while data is being fetched.
