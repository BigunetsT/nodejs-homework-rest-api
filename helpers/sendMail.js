const sgMail = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()

const { SEND_MAIL } = require('./constants')
const { SENDGRID_KEY } = process.env
sgMail.setApiKey(SENDGRID_KEY)

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'System Contacts',
    link: 'http://localhost:4000/',
  },
})

const sendMail = async ({ email, link }) => {
  const mail = {
    body: {
      name: email,
      intro:
        "Welcome to System Contacts! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with System Contacts, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link,
        },
      },
      outro: `Need help, or have questions? Just reply to ${SEND_MAIL}, we'd love to help.`,
    },
  }

  const emailBody = mailGenerator.generate(mail)
  const msg = {
    from: SEND_MAIL,
    to: email,
    subject: 'Confirm your account',
    html: emailBody,
  }
  const result = await sgMail.send(msg)
  return result
}

module.exports = sendMail
