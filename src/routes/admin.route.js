const router = require('express').Router();
const adminController = require('../controllers/admin.controller');


router.post('/register', adminController.signupAdmin);
router.post('/login', adminController.loginAdmin);

module.exports = router;