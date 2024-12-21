const errorHandler = require("../utils/error");
const bcrypt = require("bcrypt");
const User = require("../models/user");
// up[d]ate user
// const updateUser = async (req, res, next) => {
//   if (req.user.id !== req.params.id) {
//     return next(errorHandler(401, "You can update only your account!"));
//   }
//   try {
//     if (req.body.password) {
//       req.body.password = bcrypt.hashSync(req.body.password, 10);
//     }
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           username: req.body.username,
//           email: req.body.email,
//           password: req.body.password,
//         },
//       },
//       { new: true }
//     );

//     const { password, ...rest } = updatedUser._doc;
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

//delet userrrrrrr;
const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json( "User has been deleted successfully." );
  } catch (error) {
    next(error);
  }
};

module.exports = {
//   updateUser,
  deleteUser,
};
