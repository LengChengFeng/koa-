const fs = require('fs');
const path = require('path');

const dotenv = require("dotenv");

dotenv.config();

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));

module.exports = {
  APP_PORT,
  APP_HOST_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;
module.exports.PUBLIC_KEY = PUBLIC_KEY
module.exports.PRIVATE_KEY = PRIVATE_KEY