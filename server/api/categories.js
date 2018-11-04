const router = require('express').Router()
const {Location, Amenities, Review, Category} = require('../db/models')

module.exports = router;

router.get('/filter/:category', async (req, res, next) => {
	try {
		const locations = await Category.findAll({
			where: { name: req.params.category },
			include: { model: Location, through: {attributes: []} }
		});
		res.json(locations);
	} catch (error) {
		next(error);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const categories = await Category.findAll();
		res.json(categories);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const newCategory= {
			name: req.body.name,
		};
		const addedCategory = await Category.create(newCategory);
		res.status(200).json(addedCategory);
	} catch (err) {
		next(err);
	}
});

router.delete('/:categoryId', async (req, res, next) => {
    try {
      const id = req.params.categoryId;
      await Category.destroy({ where: { id } });
      res.status(204).end();
    } catch (err) {
      next(err);
    }
});