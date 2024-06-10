const fs = require('node:fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateId(data) {
	if (data.length === 0) {
		return 1;
	}
	const maxId = Math.max(...data.map((item) => item.taskId));
	return maxId + 1;
}

module.exports = (req, res) => {
	let token = req.headers['authorization']?.split(' ')[1];

	let user = jwt.verify(token, process.env.TOKEN_SECRET);

	try {
		let body = req.body;
		let taskDb = fs.readFileSync(
			path.join(__dirname, '../Database/task.db.json'),
			'utf-8'
		);

		taskDb = JSON.parse(taskDb);

		body['taskId'] = generateId(taskDb.tasks);
		body['email'] = user.email;

		taskDb.tasks.push(body);

		fs.writeFileSync(
			path.join(__dirname, '../Database/task.db.json'),
			JSON.stringify(taskDb),
			'utf-8'
		);
		res.status(201).json({
			message: 'task added succssfully',
			taskId: body['taskId'],
			task: body
		});
	} catch (err) {
		res.json({
			error: err,
		});
	}
};
