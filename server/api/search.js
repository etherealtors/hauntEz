const router = require('express').Router();
const { User, Location } = require('../db/models');

router.get('/:reqInfo', async (req, res, next) => {
	try {
		const results = await Promise.all([
			Location.findInSearch(req.params.reqInfo),
			User.findBySearch(req.params.reqInfo)
		]);

		res.json(results);
	} catch (err) {
		next(err);
	}
});
module.exports = router;
