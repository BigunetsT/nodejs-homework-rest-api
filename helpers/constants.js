const path = require('path')
require('dotenv').config()

const tempDir = path.join(process.cwd(), process.env.UPLOAD_DIR)
const avatarDir = path.join(process.cwd(), 'public', 'avatars')

module.exports = {
  tempDir,
  avatarDir,
}
