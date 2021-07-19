const User = require('./schemas/users')

const findById = (id) => {
  return User.findById(id)
}

const findByEmail = (email) => {
  return User.findOne({ email })
}

const create = (body) => {
  const { password } = body
  const newUser = new User(body)
  newUser.setPassword(password)
  return newUser.save()
}

const update = (id, body) => {
  return User.findByIdAndUpdate(id, body, {
    new: true,
  })
}

const updateToken = (id, token) => {
  return User.findByIdAndUpdate(id, { token })
}

module.exports = {
  findById,
  findByEmail,
  create,
  update,
  updateToken,
}
