const { sign } = require('jsonwebtoken');
const { compare } = require('bcrypt');
var userModel = require('../models/userModel');

var registerUserDBService = () => {
   return userModel.registerEmployee(EmployeeDetails);
}

var loginUserDBService = () => {
    return userModel.loginUser(loginDetails);
}

module.exports = { registerUserDBService, loginUserDBService}