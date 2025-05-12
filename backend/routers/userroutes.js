const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser
} = require('../controllers/usercontroller');
//const authMiddleware = require('../middlewares/authmiddleware');

router.post('/register',registerUser);
router.post('/login', loginUser);
//router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;