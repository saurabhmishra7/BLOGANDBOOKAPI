import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../utility/database";

interface IBlogAttributes {
  blogID?: number;
  title: string;
  description: Text;
  userID: number;
}

export class BlogInstance extends Model<IBlogAttributes> {}

BlogInstance.init(
  {
    blogID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "DailyBlogging",
  }
);
