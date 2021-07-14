const Contact = require('./schemas/contact.js')

const listContacts = async (userId, { limit = 20, page = 1 }) => {
  const { docs: contacts, totalDocs: total } = await Contact.paginate(
    { owner: userId },
    {
      limit,
      page,
      populate: {
        path: 'owner',
        select: 'email',
      },
    }
  )
  return { contacts, total, limit, page }
}

const getContactById = (userId, contactId) => {
  return Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'email',
  })
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
  }).populate({
    path: 'owner',
    select: 'email',
  })
}

const updateStatusContact = (userId, contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId, owner: userId }, body, {
    new: true,
  }).populate({
    path: 'owner',
    select: 'email',
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
