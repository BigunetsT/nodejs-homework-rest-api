const Contact = require('./schemas/contact.js')

const listContacts = (userId) => {
  return Contact.find({ owner: userId })
}

const getContactById = (userId, contactId) => {
  return Contact.findOne({ _id: contactId, owner: userId })
}

const removeContact = (userId, contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId, owner: userId })
}

const addContact = (userId, body) => {
  return Contact.create({ ...body, owner: userId })
}

const updateContact = (userId, contactId, fields) => {
  return Contact.findByIdAndUpdate({ _id: contactId, owner: userId }, fields, {
    new: true,
  })
}

const updateStatusContact = (userId, contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId, owner: userId }, body, {
    new: true,
  })
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
