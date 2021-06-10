/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To hit the perticular API 

 * @file            : user.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 06-05-2021
 *
 ************************************************************************* */
const userModel = require('../models/user');
const bcrypt = require('bcrypt');

class UserService {
    /**
     * @description save request data to database using model methods
     * @param {*} userDetails holds data to be saved in json formate
     * @param {*} callback holds a function 
     * */
  userRegister = (userDetails, callback) => {
    userModel.userRegister(userDetails, callback);
  };

  /**
     * @description Login The User return result accordingly to database using model methods
     * @param {*} userLogin holds data to be saved in json formate
     * @param {*} callback holds a function 
  */
  login = (userLogin, callback) => {
    userModel.checkRole(userLogin, (err, roleExist) => {
      if(err) {
        err = {
          success: false,
          message: 'something went wrong..!',
          err,
        } 
        callback(err, null);
      } else if (roleExist){
        let userRole = ''
           userRole = {
            success: false,
            message: 'Login With Valid portal'
          }
          callback(userRole, null);
      } else {
        userModel.login(userLogin, (err, result) => {
          if(result) {
            bcrypt.compare(userLogin.password, result.password, (err, data) => {
              if(err) {
                callback(err, null);
              } else if(data) {
                callback(null, result);
              } else {
                callback('Password Does Not Matched...!');
              }
            });
          } else {
            callback('User Not Found', err);
          }
        });
      }
    });
  };
};

module.exports = new UserService();
