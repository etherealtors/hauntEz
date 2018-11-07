const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
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
  },
  discountCode: {
    type: Sequelize.STRING
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

//THIS IS A DOUBLE OF A ROUTE ACTION 
Orders.removeItem = async function(itemId) {
  try {
    const removed = await Orders.destroy({where: {itemId}})
    return removed
  } catch (error) {
    console.error(error)
  }
}

// probably update this for other statuses
Orders.processOrder = async function(userId, newStatus) {
  try {
    const processOrder = await Orders.update(
      {status: newStatus},
      {fields: ['status'], where: {userId, status: 'Created'}}
    )
    return processOrder
  } catch (error) {
    console.error(error)
  }
}

// getCart() method has been moved to index.js, because it requires associations to be defined to work.

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

// Orders.prototype.updateStatus = async function(newStatus) {
//   try {
//     const updated = await this.update({status: newStatus}, {fields: ['status']})
//     return updated
//   } catch (error) {
//     console.error(error)
//   }
// }

// Hooks
Orders.beforeValidate(async order => {
  try {
    const cart = await Orders.findAll({
      where: {status: 'Created', userId: order.userId}
    })
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
