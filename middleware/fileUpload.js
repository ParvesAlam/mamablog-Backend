const multer = require('multer');

// Configure Multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Rename the file with timestamp
    },
});
  
const uploadImg = multer({ storage: storage }).single('img');
module.exports = uploadImg;