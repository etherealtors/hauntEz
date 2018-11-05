const router = require('express').Router();
const { User, Location, Amenities } = require('../db/models');

router.get('/:reqInfo', async (req, res, next) => {
	try {
		const results = await Promise.all([
			Location.findInSearch(req.params.reqInfo),
			User.findBySearch(req.params.reqInfo),
			Amenities.findWithSearch(req.params.reqInfo)
		]);
		if (results[0] === [] && results[1] === [] && results[2] === [])
			res.json(`Sorry, Couldn't Find What You Were Looking For :(`);
		res.json(results);
	} catch (err) {
		next(err);
	}
});
module.exports = router;
