const User = require('./user')
const Location = require('./location')
const Amenities = require('./amenities')
const Orders = require('./orders')
const Review = require('./review')
const Category = require('./category')
const Discount = require('./discounts')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'dbe
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Location.belongsTo(Amenities)
Amenities.hasOne(Location)
Location.belongsTo(User)
User.hasMany(Location)

Location.hasMany(Orders)
Orders.belongsTo(Location)
User.hasMany(Orders)
Orders.belongsTo(User)

// Location.belongsTo(Orders)
// Orders.hasMany(Location)
// Orders.hasMany(User)
// User.belongsTo(Orders)

// Location.belongsToMany(User, {through: 'Favs'})

//Category associations
Location.belongsToMany(Category, {through: 'location_category'})
Category.belongsToMany(Location, {through: 'location_category'})

//This has to go here because it requires associations to be made before it can work.
Orders.getCart = async function(userId) {
  try {
    const cart = await Orders.findAll({
      where: {status: 'Created', userId},
      include: [{model: Location}]
    })
    return cart
  } catch (error) {
    console.error(error)
  }
}

Discount.applyDiscountToOrder = async function(orderId, discountCode) {
  try {
    const order = await Orders.findById({
      where: {orderId}
    })
    const discount = await Discount.findOne({where: {code: discountCode}})
    const orderWithDiscount = order.map(item => {
      item.price = item.price * discount.pctOff / 100
      item.discountCode = discount.code
    })
    const updateDb = await Promise.all(
      orderWithDiscount.map(newOrder => {
        Orders.update(
          {
            price: newOrder.price,
            discountCode: newOrder.discountCode
          },
          {fields: ['price', 'discountCode']}
        )
      })
    )
    return updateDb
  } catch (error) {
    console.error(error)
  }
}

//Review associations
User.hasMany(Review)
Review.belongsTo(User)
Location.hasMany(Review)
Review.belongsTo(Location)

module.exports = {
  User,
  Location,
  Amenities,
  Orders,
  Review,
  Category,
  Discounts
}
