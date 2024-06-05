const express = require('express');

const resgisterUserController = require('../Controllers/resgisterUser.controller');
const validate = require('../Controllers/validate');
const { signup, login } = require('../Schema/user.schema');
const loginUserController = require('../Controllers/loginUser.controller');

const router = express.Router();

router.post('/signup', validate(signup), resgisterUserController);
router.post('/login', validate(login), loginUserController)

module.exports = router;
