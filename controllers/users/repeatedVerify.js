const { users: service } = require('../../service/index')
const { repeatedVerifySchema } = require('../../utils/validate/schemas/user')
const { sendMail } = require('../../helpers')

const repeatedVerify = async (req, res, next) => {
  try {
    const { error } = repeatedVerifySchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing required field email',
      })
    }

    const { email } = req.body
    const user = await service.findOne({ email })
    if (user.verify) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Verification has already been passed',
      })
    }
    const mail = {
      to: email,
      subject: 'Please verify your email',
      text: 'Please verify your email',
      html: `<a href='http://localhost:4000/api/users/verify/${user.verifyToken}'>Click for verify email </a>`,
    }
    await sendMail(mail)
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Verification email sent',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = repeatedVerify
