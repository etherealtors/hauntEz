const router = require('express').Router()
const {Orders, Discount, Location} = require('../db/models')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.get('/cart', async (req, res, next) => {
  try {
    if (req.session.passport.user) {
      const cart = await Orders.getCart(req.session.passport.user)
      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/cart', async (req, res, next) => {
  try {
    const order = await Orders.create(req.body)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.put('/cart', async (req, res, next) => {
  try {
    const order = await Orders.processOrder(
      req.session.passport.user,
      'Processing'
    )
    const token = req.body.stripeToken
    const chart = stripe.charges.create({
      amount: 420,
      currency: 'usd',
      description: 'blaze it',
      source: token
    })
    res.json('Processing')
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId/promocode', async (req, res, next) => {
  try {
    const isValid = await Discount.isValid(req.body.code)
    if (isValid) {
      const applyDiscount = await Discount.applyDiscountToOrder(
        req.params.orderId,
        req.body.code
      )
      const getDiscountedOrder = await Orders.findAll({
        where: {orderId: req.params.orderId},
        include: {model: Location}
      })
      res.json(getDiscountedOrder)
    } else {
      res.json(isValid)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
