const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const logger = require('../Logger/logger');
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

 nodeMail = (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
 ejs.renderFile('app/views/nodeMail.ejs', 'utf8', (error, info) => {
  if (error) {
    logger.log('error', error);
  } else {
    const mailOption = {
      from: 'pranilkakade2@gmail.com',
      to: data.email,
      subject: 'Reset The Password',
      html: `${info}<button><a href="${'http://localhost:8000/resetPassword/'}${this.createToken(data)}">Button</a></button>`,
    };
    transporter.sendMail(mailOption, (err, result) => {
      if (err) {
        logger.log('error', err);
      } else {
        logger.log('info', result);
      }
    });
  }
});
};

verifyToken = (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.token, process.env.JWT);
    req.userData = decode;
    const userId = decode.id;
    req.userId = userId;
    const userRole = decode.role;
    req.userRole = userRole;
    next();
  } catch (error) {
    res.status(401).send({
      error: 'Unauthorized....!!! !',
    });
  }
};
verifyRole = (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.token, process.env.JWT);
    const userRole = decode.role;
    req.userRole = userRole;
    if(decode.role !== 'admin') {
      res.status(501).send({
        success: false,
        message: 'Authorization Failed..!'
      });
    }
    next();
  } catch (error) {
    res.status(401).send({
      error: 'Unauthorized....!!! !',
    });
  }
};



};
module.exports = new Helper();
