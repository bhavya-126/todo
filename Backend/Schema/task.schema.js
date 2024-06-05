const joi = require('joi');

const newTask = joi
	.object({
		title: joi.string().required(),
		description: joi.string().required(),
	})
	.options({ stripUnknown: true });

const updateTask = joi.object({
	title: joi.string().required(),
	description: joi.string().required(),
	isActive: joi.boolean(),
});
module.exports = { newTask, updateTask };
