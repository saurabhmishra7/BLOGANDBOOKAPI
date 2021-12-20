import services from "../services/blogServices";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/default";
import { Message as message } from "../constant/message";

async function validateBlogSchema(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const results = await services.validateBlogs(
      req.body.title,
      req.body.description
    );
    next();
  } catch (e) {
    next(e);
  }
}

async function validateBlogID(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    await services.validateID(+req.params.blogID);
    next();
  } catch (e) {
    next(e);
  }
}

async function validateUserDetails(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const userInformation = {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    await services.validateUserDetails(userInformation);
    const token = jwt.sign(
      {
        userName: userInformation.userName,
        email: userInformation.email,
      },
      config.SECRET
    );
    next();
  } catch (e) {
    next(e);
  }
}

async function authenticateLoginCredential(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    if (!(userName && password)) {
      throw new Error(message.inputRequired);
    }

    const user: any = await services.verifyUser(userName);
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!(user && verifyPassword)) {
      throw new Error(message.invalid);
    }

    const token = jwt.sign(
      {
        userName: userName,
      },
      config.SECRET
    );
    req.body.token = token;
    next();
  } catch (err) {
    next(err);
  }
}

async function authenticateToken(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token: any = req.body.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new Error(message.tokenRequired);
  }
  try {
    const decoded = jwt.verify(token, config.SECRET);
    const userName = Object.values(decoded)[0];
    const user: any = await services.verifyUser(userName);
    req.body.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export default {
  validateBlogSchema,
  validateBlogID,
  validateUserDetails,
  authenticateToken,
  authenticateLoginCredential,
};
