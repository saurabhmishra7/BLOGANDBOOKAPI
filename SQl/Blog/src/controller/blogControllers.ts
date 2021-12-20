import services from "../services/blogServices";
import { Request, Response } from "express";
import { Message as message } from "../constant/message";
async function insertUser(req: Request, res: Response) {
  try {
    const userInformation: object = {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

   await services.insertUser(userInformation);
    res.send(message.registered);
  } catch (error) {
    res.send(message.unregister + "\n" + error);
  }
}

async function postBlog(req: Request, res: Response) {
  try {
    const user = req.body.user;
    await services.insertBlog(
      req.body.title,
      req.body.description,
      user.userID
    );
    res.send(message.blogSaved);
  } catch (error) {
    res.send(`${message.errorPostBlog} \n ${error}`);
  }
}

async function readBlogs(_req: Request, res: Response) {
  try {
    const blogs = await services.getBlogs();
    res.send(blogs);
  } catch (error) {
    res.send(`${message.unFetch} \n ${error}`);
  }
}

async function readBlog(req: Request, res: Response) {
  try {
    const user = req.body.user;
    const blog = await services.getBlog(user.userID);
    if (!blog) {
      throw new Error(message.notFound);
    }
    res.send(blog);
  } catch (error) {
    res.send(`${message.unFetch}\n ${error}`);
  }
}

async function removeBlog(req: Request, res: Response) {
  try {
    const user = req.body.user;
    if (!user) {
      throw new Error(message.notFound);
    }
    const result = await services.deleteBlog(user.userID);
    if (!result) {
      throw new Error(message.Deleted);
    }
    res.send(message.blogDeleted);
  } catch (error) {
    res.send(`${message.notDeleted} \n ${error}`);
  }
}

async function editBlog(req: Request, res: Response) {
  try {
    const user = req.body.user;
    if (!user) {
      throw new Error(message.notFound);
    }
    await services.updateBlog(
      user.userID,
      req.body.title,
      req.body.description
    );
    res.send(message.updated);
  } catch (error) {
    res.send(`${message.cannotUpdate} \n ${error}`);
  }
}

async function blogLogin(_req: Request, res: Response) {
  try {
    res.send(message.welcome);
  } catch (error) {
    res.send(`${message.unlogged} \n ${error}`);
  }
}

export default {
  postBlog,
  readBlog,
  readBlogs,
  removeBlog,
  editBlog,
  insertUser,
  blogLogin,
};
