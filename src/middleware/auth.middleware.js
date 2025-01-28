import jwt from "jsonwebtoken";
import userModel from "../Database/models/user.model.js";
import { asyncHandler } from "../utils/errors/error.response.js";

export const authentication = (accessRole = []) => {
  return asyncHandler(async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
      return next(new Error("Token is provided", { cause: 409 }));
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return next(new Error("Invalid Signature", { cause: 400 }));
    }
    const user = await userModel.findByPk(decodedToken.id);
    if (!user) {
      return next(new Error("Please Signup first", { cause: 400 }));
    }
    if (!accessRole.includes(user.role)) {
      return next(new Error("Unauthorized Account", { cause: 403 }));
    }
    req.loggedUser = user;
    next();
  });
};
