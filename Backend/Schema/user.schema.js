const joi = require('joi');

const signup = joi
	.object({
		name: joi.string().min(3).required(),
		email: joi.string().email().required(),
		password: joi.string().min(8).required(),
	})
	.options({ stripUnknown: true });

const login = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required(),
});

module.exports = { signup, login };
