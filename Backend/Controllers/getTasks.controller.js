const fs = require('node:fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res) => {
	try {
		let token = req.headers['authorization']?.split(' ')[1];
		let user = jwt.verify(token, process.env.TOKEN_SECRET);

		let taskData = fs.readFileSync(
			path.join(__dirname, '../Database/task.db.json'),
			'utf-8'
		);

		taskData = JSON.parse(taskData);
		let userTask = taskData.tasks.filter(
			(task) => task.email === user.email
		);
		// console.log(userTask);
		res.json({
			message: 'task fetched successfully',
			tasks: userTask,
		});
	} catch (err) {
		res.json({
			message: 'unable to get',
			error: err,
		});
	}
};
