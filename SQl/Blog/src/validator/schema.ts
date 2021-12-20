import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const schemas = {
  blogPOST: Joi.object().keys({
    title: Joi.string().min(4).required(),
    description: Joi.string().min(4).required(),
  }),
  blogID: Joi.object().keys({
    blogID: Joi.number().required(),
  }),
  userINFO: Joi.object().keys({
    userName: Joi.string().min(4).required(),
    password: passwordComplexity().required(),
    email: Joi.string().min(4).required(),
    firstName: Joi.string().min(4).required(),
    lastName: Joi.string().required(),
  }),
};

export default schemas;
