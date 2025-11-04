import Joi from 'joi';

// Vlidator schema
export const AuthValidator = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().required(),
  LGA: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'yahoo'] } }).required(),
  phoneNumber:Joi.string().min(11).required(),
  preferedName:Joi.string().required(),
  gameOfChoice:Joi.string().required(),
  profilePicture:Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  DOB:Joi.string().required(),
})

export const loginValidator = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'yahoo'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

export const resetPasswordValidator = Joi.object({
    oldPsw: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    newPsw: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

