import { Op } from "sequelize";
import userModel from "../../Database/models/user.model.js";
import { asyncHandler } from "../../utils/errors/error.response.js";

// Get user details with id form a token
export const getUserDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.loggedUser;
  const user = await userModel.findByPk(id);
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }
  return res.status(200).json({ message: "Done", user });
});
// Get User Details with id in params
export const getUserDetails2 = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findByPk(id);
  if (!user) return next(new Error("User not found", { cause: 404 }));
  res.status(200).json(user);
  res.status(500).json({ message: "Error retrieving user", error });
});
// Update User Details with id from token
export const updateUserDetails = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  const { id } = req.loggedUser;
  const user = await userModel.findByPk(id);
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }
  user.name = name || user.name;
  user.email = email || user.email;
  await user.save();
  return res.status(200).json({ message: "Done" });
});

//Update User Details with id in params
export const updateUserDetails2 = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await userModel.findByPk(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name || user.name;
  user.email = email || user.email;
  await user.save();

  res.status(200).json({ message: "User updated successfully", user });
  return res.status(200).json({ message: "Done" });
});

// Delete User => soft delete with paranoid
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findByPk(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.destroy();
  res.status(200).json({ message: "User deleted successfully" });
});

// Get All Users
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const { name, email, isVerified } = req.query;
  const where = {};
  if (name) where.name = name;
  if (email) where.email = email;
  if (isVerified) where.isVerified = isVerified === "true";

  const users = await userModel.findAll({ where });
  res.status(200).json(users);
});

// 7.1- Calculate the total number of registered users
//  7.2- Calculate the total number of veri ed users.
export const getAllUserCountRegister = asyncHandler(async (req, res, next) => {
  const totalUsers = await userModel.count();
  const verifiedUsers = await userModel.count({ where: { isVerified: true } });

  res.status(200).json({ totalUsers, verifiedUsers });
});

export const getTopUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.findAll({
    order: [["numOfLoginAccount", "DESC"]],
    limit: 3,
  });
  res.status(200).json(users);
});

export const getInactiveUsers = asyncHandler(async (req, res, next) => {
  const { period = "hour" || "month" } = req.query;
  const time =
    period === "hour"
      ? new Date(Date.now() - 60 * 60 * 1000)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const users = await userModel.findAll({
    where: { lastLogin: { [Op.lt]: time } },
  });
  res.status(200).json(users);
});
