const User = require('./schemas/users')

const findById = (id) => {
  return User.findById(id)
}

const findByEmail = (email) => {
  return User.findOne({ email })
}

const create = (body) => {
  const user = new User(body)
  return user.save()
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
