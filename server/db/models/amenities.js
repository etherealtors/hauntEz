const Sequelize = require('sequelize')
const db = require('../db')

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
    type: Sequelize.NUMBER
  },
  nearestChurch: {
    type: Sequelize.STRING
  },
  nearestChurchDistance: {
    type: Sequelize.NUMBER
  },
  skeletonsInCloset: {
    type: Sequelize.NUMBER
  }
})
