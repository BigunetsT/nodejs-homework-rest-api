const User = require('./schemas/users')

const findById = (id) => {
  return User.findOne({ _id: id })
}

const findByEmail = (email) => {
  return User.findOne({ email })
}

const create = (body) => {
  const user = new User(body)
  return user.save()
}

const updateToken = (id, token) => {
  return User.updateOne({ _id: id }, { token })
}

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
}
