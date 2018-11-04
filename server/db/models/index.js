const User = require('./user');
const Location = require('./location');
const Amenities = require('./amenities');
const Review = require('./review')
const Category = require('./category');

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

Location.belongsTo(Amenities);
Amenities.hasOne(Location);
Location.belongsTo(User);
User.hasMany(Location);
Location.belongsToMany(User, { through: 'Favs' });

//Review associations
User.hasMany(Review);
Review.belongsTo(User);
Location.hasMany(Review);
Review.belongsTo(Location);

//Category associations
Location.belongsToMany(Category, {through: 'location_category'})
Category.belongsToMany(Location, {through: 'location_category'})

module.exports = {
	User,
	Location,
	Amenities,
	Review,
	Category
};
