const fs = require('node:fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res) => {
	// let token = req.headers['authorzation']?.split(' ')[1];
	// let user = jwt.verify(token, process.env.TOKEN_SECRET);
	let id = +req.params['id'];
	try {
		let taskDb = fs.readFileSync(
			path.join(__dirname, '../Database/task.db.json'),
			'utf-8'
		);
		taskDb = JSON.parse(taskDb);
		let index = taskDb.tasks.findIndex((task) => task.taskId === id);

		if (!index) {
			res.status(404).json({
				message: 'task not found',
			});
			return;
		}

		let deletedTask = taskDb.tasks[index];
		taskDb.tasks = taskDb.tasks
			.slice(0, index)
			.concat(taskDb.tasks.slice(index + 1));

		// console.log(taskDb);
		fs.writeFileSync(
			path.join(__dirname, '../Database/task.db.json'),
			JSON.stringify(taskDb),
			'utf-8'
		);

		res.json({
			message: 'successfully deleted',
			deletedTask,
		});
	} catch (err) {
		res.status(500).json({
			message: 'error occured',
			error: err,
		});
	}
};
