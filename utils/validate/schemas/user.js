const Joi = require('joi')

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
})

module.exports = {
  userSchema,
  updateSubscriptionSchema,
}
