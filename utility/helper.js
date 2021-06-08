class Helper {
 verifyRole = (role) => (req, res, next) => {
  req.role = role;
  next();
 };
};
module.exports = new Helper();
