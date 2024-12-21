const express = require("express");
const { signup, signin, signout, google } = require("../controllers/authController");
const verifyToken = require("../utils/verifyUser");
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/google", google);

authRouter.get("/signout", signout);

module.exports = authRouter;
