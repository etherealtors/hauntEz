const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  address: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'http://res.cloudinary.com/culturemap-com/image/upload/q_auto/c_limit,w_1200/v1506457734/photos/260993_original_landscape.png'
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['Shack', 'House', 'Apartment', 'Manse', 'Castle', 'Boat']]
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
    allowNull: false
  },
  gallery: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    validate: {
      isLteFive(value) {
        if (value.length > 5) {
          throw new Error('Gallery can only hold up to five images.')
        }
      }
    }
  }
})

module.exports = Location
