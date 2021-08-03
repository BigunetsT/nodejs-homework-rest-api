const { users: service } = require('../../service/index')
const { userSchema } = require('../../utils/validate/schemas/user')
const { nanoid } = require('nanoid')
const { sendMail } = require('../../helpers')

const reg = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await service.findOne({ email })

    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
        data: 'Conflict',
      })
    }
    const { error } = userSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: error.message,
      })
    }
    const verificationToken = nanoid()

    const newUser = await service.create({
      ...req.body,
      verifyToken: verificationToken,
    })

    const link = `http://localhost:4000/api/users/verify/${verificationToken}`
    await sendMail({ email, link })
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = reg
