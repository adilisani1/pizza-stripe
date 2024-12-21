const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");

const signup = async (req, res, next) => {
    
  const { username, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    next(errorHandler(500, "Something went wrong"));
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
    try {
      // Check if user exists
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return res.status(404).json({
          message: "You need to register first. Please check your credentials.",
        });
      }

      // Check if password is correct
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(401, "Wrong password"));
      }

      // Create token
      const token = jwt.sign({ id: validUser._id,  email: validUser.email }, process.env.JWT_SECRET);

      const { password: hashedPassword, ...rest } = validUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json({
          userId: validUser._id,
          token,
          email: validUser.email,
          ...rest,
        });
    } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {

  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); 

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json({
          userId: user._id,
          token,
          email: user.email,
          ...rest,
        });
    }
    else {
       const generatedPassword =
         Math.random().toString(36).slice(-8) +
         Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() + 
        Math.floor(Math.random() * 1000),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo
      })
      await newUser.save();

      // Create token 
      let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);  
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);;
    }
  } catch (error) {
    next(error);
  }
};

const signout = async (req, res, next) => {
  try {
    res
      .status(200)
      .clearCookie("access_token")
      .send("Sign out user successfully...");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
  google,
  signout,
};
