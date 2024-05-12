import Joi from "joi";

//joi validation for user
export const userJoi = Joi.object({
  username: Joi.string().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),

  email: Joi.string()
  .pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
    
  })
});


//joi validation for product
export const productJoi = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description:Joi.string().min(3).max(50).required(),
    price:Joi.number().positive().required(),
    category:Joi.string().min(3).max(50).required(),
})