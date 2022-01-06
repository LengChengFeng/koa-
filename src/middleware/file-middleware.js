const Multer = require("koa-multer");
const { AVATAR_PATH, IMAGE_PATH } = require("../constants/file-path");

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_PATH);
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split(".")[1];
    console.log(file.fieldname + "-" + Date.now() + "." + ext);
    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});

const imagesUpload = Multer({
  storage,
});

const avatarUpload = Multer({
  dest: AVATAR_PATH,
});
const avatarHandle = avatarUpload.single("avatar");
const imagesHandle = imagesUpload.array("file");
module.exports = { avatarHandle, imagesHandle };
