import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(req.cookies)
  if (!token) {
    res.status(401);
    throw new Error("token not valid");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SCRET);
    const user = await User.findOne({ _id: decoded.id });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401);
      throw new Error("not authorized, token failed");
    }
  } catch (e) {
    res.status(401);
    throw new Error("not authorized, need a token");
  }
});
