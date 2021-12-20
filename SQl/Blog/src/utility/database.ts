import { Dialect, Sequelize } from "sequelize";
import config from "../config/default";

const DBNAME = config.DBNAME as string;
const DBUSER = config.DBUSER as string;
const DBHOST = config.DBHOST as string;
const DBPASSWORD = config.DBPASSWORD as string;
const DBDIALECT = config.DBDIALECT as Dialect;

export const sequelizeConnection = new Sequelize(DBNAME, DBUSER, DBPASSWORD, {
  dialect: DBDIALECT,
  host: DBHOST,
});
