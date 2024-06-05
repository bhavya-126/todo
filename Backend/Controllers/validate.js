module.exports = (schema) => {
	return (req, res, next) => {
		let body = req.body;
		let result = schema.validate(body);
        // console.log(result);
		if (result.error) {
			res.status(400).json({
				message: result.error.details[0].message,
			});
			return;
		}
		next();
	};
};
