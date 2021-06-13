/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To hit the perticular API 

 * @file            : user.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 06-06-2021
 ************************************************************************* */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
}, {
    timestamps: true
});
UserSchema.set("versionKey", false)

UserSchema.pre('save', async function(next) {
    try {
      if(!(this.password == null || this.password == undefined || this.password == '')){  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword
      next()
      } else {
          next()
      }

    } catch (error) {
      next(error);
    }
    
})

const User = mongoose.model('User', UserSchema);

class UserModel {
    /**
      * @description save request data to database 
      * @param {*} userDetails holds data to be saved in json formate
      * @param {*} callback holds a function 
     */
     userRegister = (userDetails, callback) => {
         const user = new User({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password: userDetails.password,
            role: userDetails.role,
        });
        user.save(callback);      
    };

    login = (userLogin, callback) => {
      User.findOne({ email: userLogin.email })
      .then((user) => {
          callback(null, user);
      }).catch((err) => {
        callback(err, null);
      });
    };

    checkRole = (userRole, callback) => {
      User.findOne({ email: userRole.email }, (err, roleCheck) => {
        if(userRole.userType === roleCheck.role ){
          callback(err, null);
        } else{
          callback(null, roleCheck);
        }
      });
    };

    /**
      * @description send Reset Link to email Id Of User 
      * @param {*} data holds email Id
      * @param {*} callback holds a function 
     */
     forgotPassword = (data, callback) => {
      User.findOne({ email: data.email })
          .then((user) => {
              callback(null, user);
          });
  };

      /**
      * @description find Email Id In the database and callback with user data or error 
      * @param {*} data hold email id
      * @param {*} callback holds a function 
      */
   resetPassword = async (data, callback) => {
    const salt = await bcrypt.genSalt(10)
    const encrypt = await bcrypt.hash(data.newPassword, salt)
    User.findOneAndUpdate({ email: data.email }, { password: encrypt }, { new: true })
        .then((cred) => {
            callback(null, cred);
        });
  };
};

module.exports = new UserModel();