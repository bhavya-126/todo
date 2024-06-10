const joi = require('joi');

const newTask = {
	body: joi
		.object({
			title: joi.string().required(),
			description: joi.string().required(),
			isActive: joi.boolean().required()
		})
		.options({ stripUnknown: true }),
	params: {},
	query: {}
};


const updateTask = {
	body: joi.object({
		title: joi.string().required(),
		description: joi.string().required(),
		isActive: joi.boolean(),
	}),
	params: joi.object({
		id: joi.number().required(),
	}),
	query: {}
}
module.exports = { newTask, updateTask };
