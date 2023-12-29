const {getDataFromDBService, removeOneUserDBService, findOneUserDBService, updateOneUserDBService} = require('../services/userService');

var getDataControllerfn = async (req, res) => {
    var employees = await getDataFromDBService();
    if (employees){
        res.send({"status": true, "message": "data retrieved", "data": employees});
    } else {
        res.send({"status": false, "message": "Error retrieving data", "data": none});
    }
}

var findUserControllerfn = async (req, res) => {
    var employee = await findOneUserDBService(req.params.id);
    if (employee){
        res.send({"status": true, "message": "data retrieved", "data": employee});
    } else {
        res.send({"status": false, "message": "Error retrieving data", "data": none});
    }
}

var updateUserControllerfn = async (req, res) => {
    const status = await updateOneUserDBService(req.params.id, req.body);
    if (status) {
        res.send({"status": true, "message": "User updated successfully"});
    } else {
        res.send({"status": false, "message": "Error updating user"});
    }
}

var deleteUserControllerfn = async (req, res) => {
    const status = await removeOneUserDBService(req.params.id);
    if (status) {
        res.send({"status": true, "message": "User deleted"});
    } else {
        res.send({"status": false, "message": "Error deleting user"});
    }
}

module.exports = { getDataControllerfn, findUserControllerfn, updateUserControllerfn, deleteUserControllerfn }