const Sequelize = require('sequelize');
const db = require('../db');
const Location = require('./location');

const Amenities = db.define('amenities', {
	incidents: {
		type: Sequelize.INTEGER
	},
	humanOccupants: {
		type: Sequelize.INTEGER
	},
	ghostOccupants: {
		type: Sequelize.INTEGER
	},
	nearestGraveyard: {
		type: Sequelize.STRING
	},
	nearestGraveyardDistance: {
		type: Sequelize.FLOAT
	},
	nearestChurch: {
		type: Sequelize.STRING
	},
	nearestChurchDistance: {
		type: Sequelize.FLOAT
	},
	skeletonsInCloset: {
		type: Sequelize.INTEGER
	}
});

Amenities.findWithSearch = (input) => {
	return Amenities.findAll({
		where: {
			[Sequelize.Op.or]: [
				{ nearestChurch: { [Sequelize.Op.iLike]: `%${input}%` } },
				{ nearestGraveyard: { [Sequelize.Op.iLike]: `%${input}%` } }
			]
		},
		include: [ { model: Location } ]
	});
};

// Amenities.findWithSearch = (input) => {
// 	return Location.findAll({
// 		attributes: {
// 			include: [
// 				{
// 					model: Amenities,
// 					[Sequelize.Op.or]: [
// 						{ nearestChurch: { [Sequelize.Op.iLike]: `%${input}%` } },
// 						{ nearestGraveyard: { [Sequelize.Op.iLike]: `%${input}%` } }
// 					]
// 				}
// 			]
// 		}
// 	});
// };

module.exports = Amenities;
