'use strict'

 
const Orders = require('./orders'); 
const { expect } = require('chai');
const db = require('../index');
const User = db.model('user');
const Bluebird = require('bluebird');
const chai = require('chai');
const chaiThings = require('chai-things');
chai.use(chaiThings);

describe('Orders', function() { 

    before(() => { 
        return db.sync({force: true})
    })

    afterEach(() => { 
        return db.sync({force: true})
    })

    describe('Class methods', function() { 

        beforeEach(() => { 
            return Bluebird.all([ 
                Orders.create({price: 47}), 
                Orders.create({status: 'Processing', quantity: 17, price: 3000}), 
                Orders.create({price: 450})
            ])
        }); 

        describe('addItem', function () { 
            it ('adds an item from the orders database', function (){ 
                return Orders.addItem({quantity: 7, price: 33})
                    .then(() => { 
                        return Orders.findAll()
                    })
                    .then((addedOrder) => { 
                        expect(addedOrder.length).to.equal(4)
                    })
            })
        })

        describe('removeItem', function () { 
            it ('removes an item from the orders database', function (){ 
                return Orders.removeItem(1)
                    .then(() => { 
                        return Orders.findAll()
                    })
                    .then((remainingOrders) => { 
                        expect(remainingOrders.length).to.equal(2)
                    })
            })
        })
    })

    describe('Instance methods', function() { 

        beforeEach(() => { 
            return Bluebird.all([ 
                Orders.create({status: 'Completed', quantity: 1000, price: 48}), 
                Orders.create({status: 'Processing', quantity: 17, price: 3001}), 
            ])
        }); 

        describe('updatePrice', function () { 
            it ('updates the price of an item', async function (){ 
                const order = await Orders.findById(2)
                expect(order.price).to.equal(3001); 
                expect(order.status).to.equal('Processing'); 
                expect(order.quantity).to.equal(17); 
                expect(order.itemId).to.equal(2); 
                
                return order.updatePrice(83)
                    .then(updatedOrder => { 
                        expect(updatedOrder.price).to.equal(83); 
                        expect(updatedOrder.status).to.equal('Processing'); 
                        expect(updatedOrder.quantity).to.equal(17)
                    
                    })
            })
        })

        describe('updateQuantity', function() { 
            it('updates the quantity of the item', async function (){ 
                const order = await Orders.findById(1)
                expect(order.price).to.equal(48); 
                expect(order.status).to.equal('Completed'); 
                expect(order.quantity).to.equal(1000); 

                return order.updateQuantity(76)
                    .then(updatedOrder => { 
                        expect(updatedOrder.price).to.equal(47); 
                        expect(updatedOrder.status).to.equal('Completed'); 
                        expect(updatedOrder.quantity).to.equal(76); 
                    })
            })
        })


    })
})

