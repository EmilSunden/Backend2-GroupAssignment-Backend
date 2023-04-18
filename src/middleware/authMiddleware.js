const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config()

const secret_key = process.env.secret_key;

module.exports = (req, res, next) => {
  if (req.methods === "OPTIONS") {
    return next();
  }
  console.log("Hello from inside auth middleware");
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret_key);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(`Error: ${e}`);
    return res.status(401).json({ message: "Auth error" });
  }
};
