const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    defaultValue: 'Created'
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// Class Methods
Orders.addItem = async function(newOrder) {
  try {
    const created = await Orders.create(newOrder)
    return created
  } catch (error) {
    console.error(error)
  }
}
Orders.removeItem = async function(id) {
  try {
    const removed = await Orders.destroy({where: {id}})
    return removed
  } catch (error) {
    console.error(error)
  }
}

// Instance Methods
Orders.prototype.updatePrice = async function(newPrice) {
  try {
    const updated = await this.update({price: newPrice}, {fields: ['price']})
    return updated
  } catch (error) {
    console.error(error)
  }
}

Orders.prototype.updateQuantity = async function(newQuantity) {
  try {
    const updated = await this.update(
      {quantity: newQuantity},
      {fields: ['quantity']}
    )
    return updated
  } catch (error) {
    console.error(error)
  }
}

Orders.prototype.updateStatus = async function(newStatus) {
  try {
    const updated = await this.update({status: newStatus}, {fields: ['status']})
    return updated
  } catch (error) {
    console.error(error)
  }
}

module.exports = Orders
