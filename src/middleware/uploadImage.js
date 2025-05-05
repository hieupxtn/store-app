const multer = require('multer');
const path = require('path');

// Cấu hình multer để lưu file tạm thời
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/temp')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

// Kiểm tra loại file
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // giới hạn 5MB
    }
});

module.exports = upload; 