var userModel = require('../models/userModel');

var getDataFromDBService = () => {
    return userModel.getEmployees();
}

var findOneUserDBService = () => {
    return userModel.findEmployeeById(id);
}

var updateOneUserDBService = () => {
    return userModel.updateEmployee(id, userDetails);
}

var removeOneUserDBService = () => {
    return userModel.deleteEmployee(id);
}

module.exports = { removeOneUserDBService, updateOneUserDBService, findOneUserDBService, getDataFromDBService }