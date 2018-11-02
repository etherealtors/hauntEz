const router = require('express').Router()
const {Orders} = require('../db/models')



router.get('/cart/:userId', async (req, res, next) => {
  console.log('hellloooooo;'); 
  try {
    console.log('REQ PARAMS', req.params.userId)
    //may need to change how we pass in the userId
    const cart = await Orders.getCart(req.params.userId)
    console.log('cart', cart); 
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
