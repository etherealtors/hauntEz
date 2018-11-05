const router = require('express').Router()
const {Orders} = require('../db/models')
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

module.exports = router
