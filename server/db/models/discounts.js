const Sequelize = require('sequelize')
const db = require('../db')

const Discount = db.define('discount', {
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATE
  },
  endDate: {
    type: Sequelize.DATE
  },
  pctOff: {
    type: Sequelize.INTEGER
  }
})

// Class Method
Discount.isValid = async function(code) {
  const dbCode = await Discount.findAll({where: {code}})
  if (dbCode) {
    if (dbCode.startDate <= Date.now() && dbCode.endDate >= Date.now()) {
      return true
    }
  }
  return false
}

module.exports = Discount
