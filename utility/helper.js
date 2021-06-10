const jwt = require('jsonwebtoken');
require('dotenv').config();

class Helper {
 setUserRole = (permission) => (req, res, next) => {
  req.role = permission;
  if(permission.includes(req.role))
  {
    next();
  } else {
    return res.status(401).send({
      success: false,
      message: 'You Dont Have Permission..!'
    });
  }
 };

 setUserType = (userRole) => (req, res, next) => {
  req.role = userRole;
  if(userRole.includes(req.role))
  {
    next();
  } else {
    return res.status(401).send({
      success: false,
      message: 'You Dont Have Permission..!'
    });
  }
 };

 createToken = (data) => {
   const token = jwt.sign({ 
    email: data.email,
    id: data._id,
    role: data.role 
  }, process.env.JWT, { expiresIn: '24d'});
  return token;
 };

 

};
module.exports = new Helper();
