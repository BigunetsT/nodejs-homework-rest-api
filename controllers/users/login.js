const { users: service } = require('../../service/index')
const { userSchema } = require('../../utils/validate/schemas/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET_KEY

const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const { error } = userSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing required name field',
      })
    }

    const user = await service.findOne({ email })
    if (!user || !user.validPassword(password) || !user.verify) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Email or password is wrong OR Verification error',
        data: 'Unauthorized',
      })
    }

    const id = user._id
    const payload = { id }

    const token = jwt.sign(payload, secret, { expiresIn: '1h' })

    await service.updateToken(id, token)
    const { subscription, avatarURL } = user
    if (token) {
      res.json({
        status: 'success',
        code: 200,
        data: {
          token,
          user: {
            email,
            subscription,
            avatarURL,
          },
        },
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = login
