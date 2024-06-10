function sendRes(result) {
	if (result?.error) {

		throw result.error.details[0].message
	} else {
		return result.value;
	}
}


module.exports = (schema) => {
	return (req, res, next) => {
		let body = req.body;
		let params = req.params;
		let query = req.query;
		let result;

		try {
			if (Object.keys(schema.body).length) {
				result = schema.body.validate(body);
				req.body = sendRes(result)
			}

			if (Object.keys(schema.params).length) {
				result = schema.params.validate(params);
				req.params = sendRes(result)

			}

			if (Object.keys(schema.query).length) {
				result = schema.query.validate(query);
				req.query = sendRes(result)
			}

			next();

		} catch (errMsg) {
			res.status(400).json({
				message: errMsg,
			});
		}
	};
};
