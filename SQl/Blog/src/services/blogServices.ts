import schemas from "../validator/schema";
import { BlogInstance as Blog } from "../model/blogModel";
import { UserInstance as User } from "../model/userModel";
import bcrypt from "bcrypt";

function validateUserLogin(userName: string, password: string) {
  const post = {
    userName: userName,
    password: password,
  };
  return schemas.userINFO.validateAsync(post);
}

function validateUserDetails(userInformation: any) {
  const post = {
    userName: userInformation.userName,
    password: userInformation.password,
    firstName: userInformation.firstName,
    lastName: userInformation.lastName,
    email: userInformation.email,
  };
  return schemas.userINFO.validateAsync(post);
}

function validateBlogs(title: string, description: string) {
  const post = {
    title: title,
    description: description,
  };
  return schemas.blogPOST.validateAsync(post);
}

function validateID(blogID: Number) {
  const post = {
    blogID: blogID,
  };
  return schemas.blogID.validateAsync(post);
}

function insertBlog(title: string, description: Text, userID: number) {
  return Blog.create({
    userID: userID,
    title: title,
    description: description,
  });
}

async function insertUser(userInformation: any) {
  const password = await encryption(userInformation.password);
  return User.create({
    userName: userInformation.userName,
    password: password,
    firstName: userInformation.firstName,
    lastName: userInformation.lastName,
    email: userInformation.email,
  });
}

function deleteBlog(userID: number) {
  return Blog.destroy({
    where: {
      userID: userID,
    },
  });
}

function getBlogs() {
  return Blog.findAll();
}

function getBlog(blogID: number) {
  return Blog.findOne({
    where: {
      blogID: blogID,
    },
  });
}

function verifyUser(userName: string) {
  return User.findOne({
    where: {
      userName: userName,
    },
  });
}

function updateBlog(userID: number, title?: string, description?: Text) {
  if (typeof title === undefined) {
    return Blog.update(
      {
        description: description,
      },
      {
        where: {
          userID: userID,
        },
      }
    );
  } else if (typeof description === undefined) {
    return Blog.update(
      {
        title: title,
      },
      {
        where: {
          userID: userID,
        },
      }
    );
  } else
    return Blog.update(
      {
        title: title,
        description: description,
      },
      {
        where: {
          userID: userID,
        },
      }
    );
}

function encryption(password: string) {
  return bcrypt.hash(password, 10);
}

export default {
  validateBlogs,
  validateID,
  insertBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  validateUserLogin,
  validateUserDetails,
  insertUser,
  encryption,
  verifyUser,
};
