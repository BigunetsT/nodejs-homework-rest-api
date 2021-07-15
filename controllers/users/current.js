const { users: service } = require('../../service/index')

const current = async (req, res, next) => {
  try {
    const id = req.user.id
    const user = await service.findById(id)
    const { email, subscription } = user
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
        data: 'Unauthorized',
      })
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        email,
        subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = current
