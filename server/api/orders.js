const router = require('express').Router()
const {Orders} = require('../db/models')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const {User} = require('../db/models'); 

router.get('/', async (req, res, next) => { 
  try {
    let orderHistory; 
    if (await User.isAdmin(req.session.passport.user)){ 
      orderHistory = await Orders.findAll({ 
        include: [{model: Location}]
      }); 
    }
    else { 
      orderHistory = await Orders.findAll({where: {userId: req.session.passport.user}, include: [{model:Location}]})
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
    console.log('hellocart'); 
    if (req.session.passport){ 
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
        order = await Orders.create(req.body)
      }
      res.json(order)
    } else { 
      console.log('hello no user'); 
      let order = await Orders.create({
        userId: req.body.userId, 
        locationId: req.body.id, 
        price: req.body.price, 
        quantity: req.body.quantity
      }); 
      res.json(order); 
    }
    
  } catch (error) {
    next(error)
  }
})

router.put('/cart', async (req, res, next) => {
  try {
    console.log('reached route'); 
    let userId; 
    if (req.session.passport) {userId = req.session.passport.user;}
    else {userId = 999}
    const order = await Orders.processOrder(
      userId,
      'Processing'
    )
    const token = req.body.stripeToken
    const chart = stripe.charges.create({
      amount: 420,
      currency: 'usd',
      description: 'blaze it',
      source: token
    })
    // localStorage.clear(); 
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
