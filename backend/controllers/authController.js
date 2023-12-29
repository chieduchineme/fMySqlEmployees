const {registerUserDBService, loginUserDBService} = require('../services/authService');

var registerUserControllerfn = async (req, res) => {
    var response = await registerUserDBService(req.body);
    if (response) {
        res.send({"status":  true, "message": "User created successfully"});
    } else {
        res.send({"status": false, "message": "Error creating user"});
    }
}

var loginUserControllerfn = async (req, res) => {
    try {
        const result = await loginUserDBService(req.body);
        if (!result.hasOwnProperty("user")) {
            return res.status(401).send({ message: 'Invalid email or username or password' });
        }
        else if (!result.hasOwnProperty("match")) {
            return res.status(401).send({ message: 'Invalid email or username or password' });
        } else {
            res.send({"status": true, "userDetails": result[0].user, "match": result[0].match});
        }
    } catch(error) {
        res.send({"status": false, "message": error.msg});
    }
}

module.exports = { registerUserControllerfn, loginUserControllerfn}