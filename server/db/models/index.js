const User = require('./user')
const Location = require('./location')
const Amenities = require('./amenities')
const Orders = require('./orders')
const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
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
  Review
}
