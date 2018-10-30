const router = require('express').Router()
const {Location} = require('../db/models')
const {Amenities} = require('../db/models')

module.exports = router

router.get('/filter/:category', async (req, res, next) => {
  try {
    const locations = await Location.findAll({
      where: {category: req.params.category},
      include: {model: Amenities}
    })
    res.json(locations)
  } catch (error) {
    next(error)
  }
})

router.get('/:locationId', async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.locationId, {
      include: {model: Amenities}
    })
    res.json(location)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const locations = await Location.findAll()
    res.json(locations)
  } catch (err) {
    next(err)
  }
})
