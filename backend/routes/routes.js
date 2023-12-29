var express = require('express');
var userController = require('../controllers/userController');
var authController = require('../controllers/authController')

const router = express.Router();

router.route('/employees').get(userController.getDataControllerfn);
router.route('/user/register').post(authController.registerUserControllerfn);

router.route('/user/findOne/:id').get(userController.findUserControllerfn);
router.route('/user/update/:id').patch(userController.updateUserControllerfn);
router.route('/user/delete/:id').delete(userController.deleteUserControllerfn);

router.route('/user/login').post(authController.loginUserControllerfn);


module.exports = router;