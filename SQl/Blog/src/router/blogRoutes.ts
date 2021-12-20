import middleware from "../middleware/middleware";
import controller from "../controller/blogControllers"
import { Router } from "express";

export const router: Router = Router();
router.post('/', middleware.authenticateToken, middleware.validateBlogSchema, controller.postBlog);
router.get('/', middleware.authenticateToken, controller.readBlogs);
router.put('/', middleware.authenticateToken,middleware.validateBlogSchema, controller.editBlog);
router.delete('/', middleware.authenticateToken, controller.removeBlog);
