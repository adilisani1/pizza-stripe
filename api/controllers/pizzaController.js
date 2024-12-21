const Pizza = require("../models/pizzaModel");

// Get all pizzas
const allPizza = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching pizzas", error: err.message });
  }
};

// Get a single pizza with ID
const singlePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }
    res.json(pizza);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching pizza", error: err.message });
  }
};

module.exports = { allPizza, singlePizza };
