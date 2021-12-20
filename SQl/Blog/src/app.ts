import express, { Application } from "express";
import { sequelizeConnection as db } from "./utility/database";
import config from "../src/config/default";
import { router as blog } from "./router/blogRoutes";
import { router as user } from "./router/userRoutes";

const app: Application = express();
const Port = config.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sync({
  alter: true,
});

app.use("/blog", blog);
app.use("/user", user);
app.listen(Port, () => {
  console.log(`The server is running at http://localhost:${Port}/`);
});
