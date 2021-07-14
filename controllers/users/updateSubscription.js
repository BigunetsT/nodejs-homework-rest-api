const { users: service } = require('../../service/index')
const {
  updateSubscriptionSchema,
} = require('../../utils/validate/schemas/user')

const updateSubscription = async (req, res, next) => {
  try {
    const { error } = updateSubscriptionSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: error.message,
      })
    }
    const userId = req.user.id

    const updateSubscription = await service.updateSubscription(userId, {
      ...req.body,
    })
    return res.json({
      status: 'success',
      code: 200,
      data: {
        result: updateSubscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateSubscription
