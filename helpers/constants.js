const path = require('path')
require('dotenv').config()

const tempDir = path.join(process.cwd(), process.env.UPLOAD_DIR)
const avatarDir = path.join(process.cwd(), 'public', 'avatars')
const SEND_MAIL = 'bigunetst@meta.ua'

module.exports = {
  tempDir,
  avatarDir,
  SEND_MAIL,
}
