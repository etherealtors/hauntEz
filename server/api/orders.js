const router = require('express').Router()
const {Orders} = require('../db/models')

router.get('/cart/:userId', async (req, res, next) => {
  try {
    const cart = await Orders.getCart(req.params.userId)
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
