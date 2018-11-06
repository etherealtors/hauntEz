const router = require('express').Router()
const {Orders, Discount} = require('../db/models')
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
    console.log('req:', req.body)
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

router.put('/:orderId/promocode/:code', async (req, res, next) => {
  try {
    const isValid = await Discount.isValid(req.params.code)
    if (isValid) {
      const applyDiscount = await Discount.applyDiscountToOrder(
        req.params.orderId,
        req.params.code
      )
      res.json(applyDiscount)
    } else {
      res.json(isValid)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
