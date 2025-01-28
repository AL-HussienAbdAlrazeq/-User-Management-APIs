import { Router } from "express";
import { authentication } from "../../middleware/auth.middleware.js";
import {
  deleteUser,
  getAllUserCountRegister,
  getAllUsers,
  getInactiveUsers,
  getTopUsers,
  getUserDetails,
  updateUserDetails,
} from "./user.controller.js";
import { validation } from "../../middleware/validation.middleware.js";
import { updateUserValidation } from "./user.validation.js";

const userRouter = Router();

userRouter.get(
  "/get-user-details",
  authentication(["user", "admin"]),
  getUserDetails
);
userRouter.get(
  "/get-all-users",
  authentication(["user", "admin"]),
  getAllUsers
);
userRouter.patch(
  "/update-user",
  validation(updateUserValidation),
  authentication(["user", "admin"]),
  updateUserDetails
);
userRouter.delete(
  "/delete-user/:id",
  authentication(["admin"]),
  deleteUser
);

userRouter.get('/get-user-count',authentication(['admin']),getAllUserCountRegister)

userRouter.get('/get-top-user',authentication(['admin']),getTopUsers)
userRouter.get('/get-inactive-users',authentication(['admin']),getInactiveUsers)



export default userRouter;
