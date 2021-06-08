/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To hit the perticular API 

 * @file            : user.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 02-05-2021
 *
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
};

module.exports = new UserModel();