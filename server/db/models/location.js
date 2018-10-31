const Sequelize = require('sequelize');
const db = require('../db');
let SearchModel = require('pg-search-sequelize');
const { QueryInterface } = require('pg-search-sequelize');
let Location = db.define(
	'location',
	{
		address: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		imageUrl: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue:
				'http://res.cloudinary.com/culturemap-com/image/upload/q_auto/c_limit,w_1200/v1506457734/photos/260993_original_landscape.png'
		},
		category: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				isIn: [ [ 'Shack', 'House', 'Apartment', 'Manse', 'Castle', 'Boat' ] ]
			}
		},
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		price: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
		description: {
			type: Sequelize.TEXT,
			//allowNull: false,
			defaultValue: 'PLACE HOLDER'
		},
		gallery: {
			type: Sequelize.ARRAY(Sequelize.STRING)
			/*validate: {
      isLteFive(value) {
        if (value.length > 5) {
          throw new Error('Gallery can only hold up to five images.')
        }
      }
    }*/
		}
	},
	{
		indexes: [ { type: 'FULLTEXT', name: 'test_indx', fields: [ 'address' ] } ]
	}
);

Location = new SearchModel(Location);

const materializedViewName = 'location_materialized_view';

const attributes = {
	address: 'A',
	category: 'B',
	description: 'C'
};

let LocationMaterialzedView = db.define(
	'locationMaterializedView',
	{
		address: Sequelize.STRING,
		category: Sequelize.STRING
	},
	{
		referenceModel: Location
	}
);

LocationMaterialzedView = new SearchModel(LocationMaterialzedView);

// Location.findInSearch = (input) => {
// 	return Location.findAll({
// 		where: Sequelize.literal(`MATCH (address) AGAINST ${input}`)
// 	});
// };

Location.findInSearch = (input) => {
	return Location.findAll({
		where: {
			[Sequelize.Op.or]: [
				{ address: { [Sequelize.Op.iLike]: `%${input}%` } },
				{ category: { [Sequelize.Op.iLike]: `%${input}%` } }
			]
		}
	});
};

module.exports = {
	Location,
	up: (queryInterface) =>
		new QueryInterface(queryInterface).createMaterializedView(materializedViewName, Location, attributes),
	down: (queryInterface) => new QueryInterface(queryInterface).dropMaterializedView(materializedViewName)
};
