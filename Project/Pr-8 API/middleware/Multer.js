const multer = require('multer');

const st = multer.diskStorage({
  destination: (req, res, cb) => {
    return cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    let unique = Math.floor(Math.random() * 10000000);
    return cb(null, `${file.fieldname}-${unique}`);
  }
});

module.exports = multer({ storage: st });