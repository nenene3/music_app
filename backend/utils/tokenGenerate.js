import jwt from "jsonwebtoken";

const tokenGeneretor = (res, id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SCRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict", 
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default tokenGeneretor;