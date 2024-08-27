import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";
import asyncHandler from "express-async-handler";
import tokenGeneretor from "../utils/tokenGenerate.js";
export const register = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("email already used");
  }
  const newUser = await User.create({ ...req.body });
  if (newUser) {
    tokenGeneretor(res, newUser._id);
    newUser.password = undefined;
    return res.json({ newUser });
  }
  res.status(400);
  throw new Error("Invalid user data");
});

export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user && (await user.comparePassword(req.body.password))) {
    tokenGeneretor(res, user._id);
    user.password = undefined;
    res.json({ user });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

export const logOut = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "clear cookie" });
};
