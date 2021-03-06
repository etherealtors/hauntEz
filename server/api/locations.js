const router = require('express').Router();
const { Location, Amenities, Review, User, Category } = require('../db/models');

module.exports = router;

router.get('/filter/:category', async (req, res, next) => {
	try {
		const locations = await Location.findAll({
			/*where: { category: req.params.category },
			include: { model: Amenities }*/
			
			include: [{model: Category, where: {name: req.params.category, categoryType: "houseType"}, through: {attributes: []}}]
		});
		res.json(locations);
	} catch (error) {
		next(error);
	}
});

router.get('/:locationId', async (req, res, next) => {
	try {
		const location = await Location.findById(req.params.locationId, {
			include: [ { model: Amenities }, { model: Review, include: { model: User } }, { model: User } ]
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
		const addedLocation = await Location.create(newLocation);
		res.status(200).json(addedLocation);
	} catch (err) {
		next(err);
	}
});

router.put('/:locationId', async (req, res, next) => {
	try {
		const updated = await Location.update(req.body, { returning: true, where: { id: req.params.locationId } });
		res.status(200).json(updated[1][0]);
	} catch (err) {
		next(err);
	}
});

router.post('/:locationId', async (req, res, next) => {
	try {
		console.log('Body:', req.body);
		const addedComment = await Review.create(req.body);
		res.json(addedComment);
	} catch (err) {
		next(err);
	}
});
