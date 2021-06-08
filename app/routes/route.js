/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : to hit the perticular API

 * @file            : route.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 06-05-2021
 ************************************************************************* */
const user = require('../controllers/user');
const helper = require('../../utility/helper');

module.exports = (app) => {
  app.post('/user', helper.verifyRole('user'), user.userRegister);

  app.post('/admin', helper.verifyRole('admin'), user.userRegister);
};
