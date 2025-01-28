import bcrypt from "bcrypt";
import userModel from "../../Database/models/user.model.js";
import { asyncHandler } from "../../utils/errors/error.response.js";
import jwt from "jsonwebtoken";

export const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExist = await userModel.findOne({ where: { email } });
  if (userExist) {
    return next(new Error("Email already exist", { cause: 409 }));
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  await userModel.create({ name, email, password: hashPassword });
  return res.status(201).json({ message: "Created successfully" });
});

export const verifyUserAccount = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ where: { email } });
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }
  user.isVerified = true;
  await user.save();
  return res.status(200).json({ message: "Done" });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ where: { email } });
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }
  const compareHash = bcrypt.compareSync(password, user.password);
  if (!compareHash) {
    return next(new Error("Incorrect Email or Password", { cause: 404 }));
  }
  if (!user.isVerified) {
    return next(new Error("Please verify first", { cause: 404 }));
  }
  user.numOfLoginAccount += 1;
  user.lastLogin = new Date();
  await user.save();
  const token = jwt.sign({ id: user.id, email , role:user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.status(201).json({ message: "Created successfully", token });
});
