const Sequelize = require('sequelize')
const db = require('../db')
const Locations = require('./location')

const Orders = db.define('orders', {
  itemId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
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

Orders.removeItem = async function(itemId) {
  try {
    const removed = await Orders.destroy({where: {itemId}})
    return removed
  } catch (error) {
    console.error(error)
  }
}

Orders.getCart = async function(userId) {
  try {
    const cart = await Orders.findAll({where: {status: 'Created', userId}})
    return cart
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

// Hooks
Orders.beforeValidate(async order => {
  try {
    const cart = await Orders.getCart()
    if (cart.length) {
      // if the user has an existing order in their cart, add the item to that order
      order.orderId = cart[0].orderId
    } else {
      // if the user does not have an existing order create a new order number.
      const orderNumber = ((await Orders.max('orderId')) || 0) + 1 // to deal with the first order
      order.orderId = orderNumber
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = Orders
