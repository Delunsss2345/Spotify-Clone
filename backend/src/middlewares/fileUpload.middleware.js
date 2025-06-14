const path = require('path');
const fileUpload = require('express-fileupload');

module.exports = fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, '../../public/tmp'),
  createParentPath: true,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});