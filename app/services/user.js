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

class UserService {
    /**
     * @description save request data to database using model methods
     * @param {*} userDetails holds data to be saved in json formate
     * @param {*} callback holds a function 
     * */
  userRegister = (userDetails, callback) => {
    userModel.userRegister(userDetails, callback);
  };
};

module.exports = new UserService();
