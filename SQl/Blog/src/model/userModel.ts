import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../utility/database";

interface IBlogAttributes {
  userID?: number;
  userName: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class UserInstance extends Model<IBlogAttributes> {}

UserInstance.init(
  {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        min: 5,
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "UserInformation",
  }
);
