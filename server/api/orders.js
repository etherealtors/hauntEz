const router = require('express').Router()
const {Orders} = require('../db/models')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const {User} = require('../db/models'); 

router.get('/', async (req, res, next) => { 
  try {
    let orderHistory; 
    if (await User.isAdmin(req.session.passport.user)){ 
      orderHistory = await Orders.findAll(); 
    }
    else { 
      orderHistory = await Orders.findAll({where: {userId: req.session.passport.user}})
    }
    
    res.json(orderHistory); 
  } catch (error) {
    next(error); 
  }
})

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
    if (req.session.passport.user){ 
      let order = await Orders.findOne({where: {
        userId: req.session.passport.user, 
        locationId: req.body.locationId, 
        status: 'Created'
      }})
      if (order) { 
        let newQuant = Number(order.quantity) + Number(req.body.quantity); 
        await Orders.update({quantity: newQuant}, {fields:['quantity'], 
        where: {userId: req.session.passport.user, 
          locationId: req.body.locationId, 
          status: 'Created'}})
      } else { 
        order = Orders.create(req.body)
      }
      res.json(order)
    } else { 
      //localStorage 
    }
    
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

//THIS IS A DOUBLE OF A DB METHOD

router.delete('/cart/:itemId', async (req, res, next) => { 
  try {
    Orders.destroy({where : {id: req.params.itemId}})
    res.status(204).end(); 
  } catch (error) {
    next(error); 
  }
})

module.exports = router
