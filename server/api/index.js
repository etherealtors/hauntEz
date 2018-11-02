const router = require('express').Router()
module.exports = router

// router.use('*', (req, res, next) => {
//   // console.log('req: ', req)
//   // console.log('res: ', res)
//   next()
// })

router.use('/users', require('./users'))
router.use('/locations', require('./locations'))
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
