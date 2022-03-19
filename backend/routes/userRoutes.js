const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .put(authController.protect, userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
