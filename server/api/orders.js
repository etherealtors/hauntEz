const router = require('express').Router()
const {Orders} = require('../db/models')

module.exports = router

router.get('/cart', async (req, res, next) => {
  try {
    console.log(req.body)
    //may need to change how we pass in the userId
    const cart = await Orders.getCart(req.body)
    res.json(cart)
  } catch (error) {
    next(error)
  }
})
