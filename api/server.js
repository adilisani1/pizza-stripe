const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const pizzaRouter = require("./routes/pizzaRoute");
const authRouter = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const orderRouter = require("./routes/orderRoute");
const userRouter = require("./routes/userRoute");

require('dotenv').config();  

const app = express();
const port = process.env.PORT || 5000;

connectDB();
app.use(express.static("public")); 

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api", pizzaRouter);
app.use("/api", authRouter)
app.use("/api", orderRouter)
app.use("/api", userRouter)
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
