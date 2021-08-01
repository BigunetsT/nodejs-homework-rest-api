const User = require('./schemas/users')

const findById = (id) => {
  return User.findById(id)
}

const findByEmail = (email) => {
  return User.findOne({ email })
}

const findOne = (filter) => {
  return User.findOne(filter)
}

const create = ({ password, ...other }) => {
  const newUser = new User(other)
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

const updateAvatar = (id, newFileName) => {
  return User.findByIdAndUpdate(
    id,
    { avatarURL: newFileName },
    {
      new: true,
    }
  )
}

module.exports = {
  findById,
  findByEmail,
  create,
  update,
  updateToken,
  updateAvatar,
  findOne,
}
