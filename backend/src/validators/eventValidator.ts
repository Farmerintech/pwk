 
 import Joi from 'joi';

// Vlidator schema
export const EventValidator = Joi.object({
  tittle:Joi.string().required(),
  description:Joi.string().required(),
  status: Joi.string().required(),
  Attendees: Joi.string(),
  RegisteredUsers:Joi.string(),
  totalRevenueGenerated:Joi.number(),
  totalCostSpent:Joi.number(),
  fixedDate:Joi.number(),

});