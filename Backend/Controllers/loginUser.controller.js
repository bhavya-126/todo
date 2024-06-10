const fs = require('node:fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
require('dotenv').config();

function generateToken(data) {
	return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

module.exports = (req, res) => {
	let body = req.body;

	try {
		let user = fs.readFileSync(
			path.join(__dirname, '../Database/user.db.json'),
			'utf-8'
		);
		user = JSON.parse(user);


		let loggedInUser = user.data.find((user) => user.email === body.email);

		if (loggedInUser) {

			// console.log("password compare result", bcrypt.compareSync(body.password, loggedInUser.password))

			if (bcrypt.compareSync(body.password, loggedInUser.password)) {
				let token = generateToken({
					name: loggedInUser.name,
					email: loggedInUser.email,
				});

				res.json({
					message: 'logged in successfully',
					token,
				});
			} else {
				res.status(400).json({
					message: 'invalid email or password',
				});
			}
		} else {
			res.status(404).json({
				message: 'user not found',
			});
		}
	} catch (err) {
		res.status(500).json({
			message: "unable to login",
		});
	}
};
