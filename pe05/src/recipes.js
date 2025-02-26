const initialRecipes = [
    {
      _id: "1", // You might use UUIDs or MongoDB's _id in a real app
      name: "Spaghetti Carbonara",
      ingredients: "1 lb spaghetti, 4 eggs, 1/2 cup grated Parmesan cheese, 1/4 cup pancetta, 2 cloves garlic, black pepper, salt",
      instructions: "Cook spaghetti according to package directions. While pasta cooks, whisk eggs, Parmesan, and black pepper. Cook pancetta until crisp, add garlic. Drain pasta, add to pancetta, toss. Remove from heat, add egg mixture, toss until creamy. Serve immediately with extra Parmesan.",
    },
    {
      _id: "2",
      name: "Chicken Stir-Fry",
      ingredients: "1 lb boneless chicken, 1 onion, 2 bell peppers, 1 cup broccoli florets, 1/4 cup soy sauce, 2 tbsp honey, 1 tbsp ginger, 1 tbsp garlic, vegetable oil",
      instructions: "Cut chicken into bite-sized pieces. Stir-fry chicken until cooked through. Add onion, peppers, broccoli, stir-fry until tender-crisp. Whisk soy sauce, honey, ginger, garlic. Add sauce to stir-fry, cook until thickened. Serve over rice.",
    },
    {
      _id: "3",
      name: "Guacamole",
      ingredients: "3 ripe avocados, 1/2 onion, 2 tomatoes, 1 jalapeno, 1/4 cup cilantro, 2 limes, salt",
      instructions: "Mash avocados. Dice onion, tomatoes, jalapeno, cilantro. Add to avocados. Squeeze lime juice, add salt. Mix well. Serve with tortilla chips.",
    },
    {
        _id: "4",
        name: "Chocolate Chip Cookies",
        ingredients: "1 cup butter, 3/4 cup granulated sugar, 3/4 cup brown sugar, 2 eggs, 1 tsp vanilla extract, 2 1/4 cups all-purpose flour, 1 tsp baking soda, 1/2 tsp salt, 2 cups chocolate chips",
        instructions: "Preheat oven to 375°F (190°C). Cream together butter, granulated sugar, and brown sugar. Beat in eggs and vanilla. In a separate bowl, whisk together flour, baking soda, and salt. Gradually add to the wet ingredients. Stir in chocolate chips. Drop by rounded tablespoons onto ungreased baking sheets. Bake for 9-11 minutes, or until golden brown.",
    },
    {
        _id: "5",
        name: "Margarita",
        ingredients: "2 oz tequila, 1 oz lime juice, 1 oz Cointreau or triple sec, salt, lime wedge",
        instructions: "Rub the rim of a margarita glass with lime and dip in salt. Combine tequila, lime juice, and Cointreau in a shaker with ice. Shake well and strain into the glass. Garnish with a lime wedge.",
    },
  ];
  
  export default initialRecipes;