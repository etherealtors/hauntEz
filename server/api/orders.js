const router = require('express').Router()
const {Orders} = require('../db/models')
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
    res.json('Processing')
  } catch (error) {
    next(error)
  }
})

module.exports = router
