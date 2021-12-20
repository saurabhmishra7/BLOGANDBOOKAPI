import middleware from "../middleware/middleware";
import controller from "../controller/blogControllers";
import { Router } from "express";

export const router: Router = Router();
router.post('/register', middleware.validateUserDetails, controller.insertUser);
router.post('/login', middleware.authenticateLoginCredential, controller.blogLogin);
