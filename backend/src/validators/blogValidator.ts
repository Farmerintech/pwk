 
 import Joi from 'joi';

// Vlidator schema
export const BlogValidator = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});