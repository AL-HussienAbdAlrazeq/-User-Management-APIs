import { DataTypes } from "sequelize";
import { sequelize } from "../DB.Connection.js";

const userModel = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "User_Name",
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
      allowNull: false,
    },
    numOfLoginAccount: { type: DataTypes.INTEGER, defaultValue: 0 },
    lastLogin:{ type: DataTypes.DATE, defaultValue: null }
  },
  {
    timestamps: true,
    paranoid: true,
  }
);
export default userModel;
