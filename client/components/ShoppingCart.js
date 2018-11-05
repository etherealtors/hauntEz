import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fillCart, buyStuff, deleteFromOrder} from '../store'


class ShoppingCart extends Component {
  constructor() {
    super()
    this.submitOrder = this.submitOrder.bind(this)
    this.handleDelete = this.handleDelete.bind(this); 
  }
  componentDidMount() {
    this.props.fillCart()
  }

  handleDelete(itemId){ 
    this.props.deleteFromOrder(itemId)
  }

  submitOrder() {
    this.props.buyStuff('Processing')
    alert(
      'Your order has been placed. Thanks for shopping with HauntEZ, where our UX is as spooky as our customers!'
    )
  }

  render() {
    let total = 0; 
    return (
      <div>
        <div className="shopping-cart">
          {this.props.cart.map(item => {
            if (item.location){ 
              total+= item.location.price*item.quantity
            }
             
            return (
              item.location ? (
              <div>
              <h2 key={item.id}>
                {item.location.address} for ${item.location.price} x{item.quantity} = ${item.location.price*item.quantity}
              </h2> 
              <button type="button" onClick={() => this.handleDelete(item.id)}>Remove From Cart</button>
              </div>
              ) : <h2></h2>
              
            )
          })}
          <h3>Total: ${total}</h3>
        </div>
        <button type="submit" onClick={this.submitOrder}>
          Submit order!
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.orders.orders
})

const mapDispatchToProps = dispatch => ({
  fillCart: () => dispatch(fillCart()),
  buyStuff: status => dispatch(buyStuff(status)), 
  deleteFromOrder: itemId => dispatch(deleteFromOrder(itemId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
)
