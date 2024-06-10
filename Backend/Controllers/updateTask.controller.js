const fs = require('node:fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res) => {
	let token = req.headers['authorization']?.split(' ')[1];
	let user = jwt.verify(token, process.env.TOKEN_SECRET);
	let body = req.body;
	let id = +req.params['id'];

	try {
		let taskDb = fs.readFileSync(
			path.join(__dirname, '../Database/task.db.json'),
			'utf-8'
		);
		taskDb = JSON.parse(taskDb);
		let index = taskDb.tasks.findIndex((task) => task.taskId === id);

		if (index < 0) {
			res.status(404).json({
				message: 'task not found',
			});
			return;
		}

		body['taskId'] = id;
		body['email'] = user.email;

		taskDb.tasks[index] = body;
		// console.log(taskDb);
		fs.writeFileSync(
			path.join(__dirname, '../Database/task.db.json'),
			JSON.stringify(taskDb),
			'utf-8'
		);

		res.json({
			message: 'successfully updated',
		});
	} catch (err) {
		res.status(500).json({
			message: 'error occured',
			error: err,
		});
	}
};
