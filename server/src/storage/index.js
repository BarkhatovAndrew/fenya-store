const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'public', 'storage'),
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}.${file.mimetype.split('/')[1]}`);
  },
});

module.exports = { storage };
