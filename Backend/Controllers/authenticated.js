const jwt = require('jsonwebtoken');
// require('dotenv').config();

module.exports = (req, res, next) => {
	let token = req.headers['authorization']?.split(' ')[1];
	if (!token) {
		res.status(401).json({
			message: 'unautherized',
		});
		return;
	}
	// console.log(process.env.TOKEN_SECRET);
	// let decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	next();
};
