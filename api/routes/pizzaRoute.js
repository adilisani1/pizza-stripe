
const express = require("express");
const { allPizza, singlePizza } = require("../controllers/pizzaController");
const pizzaRouter = express.Router();

pizzaRouter.get("/pizzas", allPizza);
pizzaRouter.get("/pizzas/:id", singlePizza);

module.exports = pizzaRouter;