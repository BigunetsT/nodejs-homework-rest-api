const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SEND_MAIL } = require('./constants')
const { SENDGRID_KEY } = process.env
sgMail.setApiKey(SENDGRID_KEY)

const sendMail = async ({ to, subject, text, html }) => {
  const mail = {
    to,
    from: SEND_MAIL,
    subject,
    text,
    html,
  }
  const result = await sgMail.send(mail)
  return result
}

module.exports = sendMail
