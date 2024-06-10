const joi = require('joi');

const signup = {
	body: joi
		.object({
			name: joi.string().min(3).required(),
			email: joi.string().email().required(),
			password: joi.string().min(8).required(),
		})
		.options({ stripUnknown: true }),
		params: {},
		query: {}
};

const login = {
	body: joi.object({
		email: joi.string().email().required(),
		password: joi.string().required(),
	})
	.options({ stripUnknown: true }),
	params: {},
	query: {}
}

module.exports = { signup, login };
