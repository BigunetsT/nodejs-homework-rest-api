const { contacts: service } = require('../../service/index')

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { contactId } = req.params
    const allContacts = await service.listContacts(userId, req.query)
    const contacts = allContacts.contacts

    if (contacts.map((item) => String(item.id)).includes(contactId)) {
      const selectContact = await service.getContactById(userId, contactId)
      return res.json({
        status: 'success',
        code: 200,
        data: {
          result: selectContact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = getContactById
