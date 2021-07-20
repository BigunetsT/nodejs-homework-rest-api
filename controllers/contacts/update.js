const { contacts: service } = require('../../service/index')
const { updateContactSchema } = require('../../utils/validate/schemas/contact')

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'error',
        code: 404,
        message: 'missing fields',
      })
    }
    const { error } = updateContactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: error.message,
      })
    }
    const { contactId } = req.params
    const allContacts = await service.listContacts(userId, req.query)
    const contacts = allContacts.contacts

    if (contacts.map((item) => String(item.id)).includes(contactId)) {
      const updatedContact = await service.updateContact(
        userId,
        contactId,
        req.body
      )
      return res.json({
        status: 'success',
        code: 200,
        data: {
          result: updatedContact,
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

module.exports = updateContact
