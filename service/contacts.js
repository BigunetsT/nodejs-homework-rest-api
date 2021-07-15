const Contact = require('./schemas/contact.js')

const listContacts = async (userId, { limit = 20, page = 1, favorite }) => {
  const { docs: contacts, totalDocs: total } = await Contact.paginate(
    { owner: userId, favorite: favorite || { $in: [true, false] } },
    {
      limit,
      page,
      populate: {
        path: 'owner',
        select: 'email',
      },
    }
  )

  return {
    contacts,
    total,
    limit,
    page,
  }
}

const getContactById = async (userId, contactId) => {
  return await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'email',
  })
}

const removeContact = (userId, contactId) => {
  return Contact.findOneAndRemove({ _id: contactId, owner: userId })
}

const addContact = (userId, body) => {
  return Contact.create({ ...body, owner: userId })
}

const updateContact = (userId, contactId, fields) => {
  return Contact.findOneAndUpdate({ _id: contactId, owner: userId }, fields, {
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
}
