const passport = require('passport')
const passportJWT = require('passport-jwt')
const { users: service } = require('../service/index')
require('dotenv').config()
const secret = process.env.JWT_SECRET_KEY

const ExtractJWT = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await service.findById(payload.id)

      if (!user) {
        return done(new Error('User not found'))
      }
      if (!user.token) {
        return done(null, false)
      }
      return done(null, user)
    } catch (error) {
      done(error)
    }
  })
)
