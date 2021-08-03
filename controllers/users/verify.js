const { users: service } = require('../../service/index')

const verify = async (req, res, next) => {
  const { verificationToken } = req.params
  try {
    const user = await service.findOne({ verifyToken: verificationToken })
    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      })
    }
    if (user.verify) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Verification has already been passed',
      })
    }
    await service.update(user._id, {
      verificationToken: null,
      verify: true,
    })
    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Verification successful',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = verify
