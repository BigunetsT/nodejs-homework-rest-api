const Joi = require('joi')

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .error(
      new Error(
        'password must be at least 8 characters long containing 1 capital letter, 1 small letter, 1 digit and 1 of these special characters(@, $, !, %, *, ?, &)'
      )
    ),
})

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
})

module.exports = {
  userSchema,
  updateSubscriptionSchema,
}
