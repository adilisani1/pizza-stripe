const mongoose = require("mongoose");
const connectDB = require("./db/db");
const Pizza = require("./models/pizzaModel"); 
require("dotenv").config();

const mockPizzaData = [
  {
    name: "Pepperoni Pizza",
    description: "A favorite topped with spicy pepperoni and mozzarella.",
    price: 10.99,
    ingredients: ["Pepperoni", "Mozzarella", "Tomato Sauce"],
    image: "/images/pepperoni-pizza.png",
    category: "Specialty",
  },
  {
    name: "Vegetarian Pizza",
    description:
      "Loaded with fresh vegetables like bell peppers, onions, and mushrooms.",
    price: 9.49,
    ingredients: [
      "Bell Peppers",
      "Onions",
      "Mushrooms",
      "Olives",
      "Mozzarella",
    ],
    image: "/images/vege-pizza.png",
    category: "Vegetarian",
  },
];

const insertPizzaData = async () => {
  try {
    await connectDB();

    // Insert mock data
    const result = await Pizza.insertMany(mockPizzaData);
    console.log("Pizza data inserted successfully!", result);

    mongoose.connection.close();
  } catch (err) {
    console.error("Error inserting pizza data:", err);
  }
};

insertPizzaData();
