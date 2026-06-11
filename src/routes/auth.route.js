const router = require('express').Router();
const authController = require('../controllers/auth.controller');


router.post('/register', authController.signupUser);
router.post('/login', authController.loginUser);

module.exports = router;