import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const schema = mongoose.Schema({
  email: {
    type: String,
    unique: [true, "email already used"],
    required: [true, "pls enter email"],
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "pls enter password"],
  },
});
schema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

const User = mongoose.model("User", schema);
export default User;
