const Sequelize = require('sequelize')
const db = require('../db')

const Amenities = db.define('amenities', {
  incidents: {
    type: Sequelize.INTEGER,
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
})

module.exports = Amenities
