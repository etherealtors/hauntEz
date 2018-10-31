const router = require('express').Router();
const { Location } = require('../db/models');
const { Amenities } = require('../db/models');

module.exports = router;

router.get('/filter/:category', async (req, res, next) => {
	try {
		const locations = await Location.findAll({
			where: { category: req.params.category },
			include: { model: Amenities }
		});
		res.json(locations);
	} catch (error) {
		next(error);
	}
});

router.get('/:locationId', async (req, res, next) => {
	try {
		const location = await Location.findById(req.params.locationId, {
			include: { model: Amenities }
		});
		res.json(location);
	} catch (err) {
		next(err);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const locations = await Location.findAll();
		res.json(locations);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	console.log('posting!');
	try {
		//change to make more secure after figuring out
		const newLocation = {
			category: req.body.category,
			address: req.body.address,
			description: req.body.description,
			quantity: req.body.quantity,
			price: req.body.price,
			imageUrl: req.body.imageUrl
		};
		console.log('newLocation', newLocation);
		const addedLocation = await Location.create(newLocation);
		res.status(200).json(addedLocation);
	} catch (err) {
		next(err);
	}
});
