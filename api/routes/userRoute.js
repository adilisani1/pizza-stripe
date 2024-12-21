const express = require("express");
const verifyToken = require("../utils/verifyUser");
const {
//   updateUser,
  deleteUser,
} = require("../controllers/userController");
const userRouter = express.Router();

// userRouter.post("/update/:id", verifyToken, updateUser);

userRouter.delete("/delete/:id", verifyToken, deleteUser);

module.exports = userRouter;
