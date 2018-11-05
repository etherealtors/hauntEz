import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fillCart} from '../store'

class ShoppingCart extends Component {
  constructor() {
    super()
    this.submitOrder = this.submitOrder.bind(this)
  }
  componentDidMount() {
    this.props.fillCart()
  }

  submitOrder() {
    // this.placeOrder()
    alert(
      'Your order has been placed. Thanks for shopping with HauntEZ, where our UX is as spooky as our customers!'
    )
  }

  render() {
    console.log('this.props.cart', this.props.cart)
    return (
      <div>
        <div className="shopping-cart">
          {this.props.cart.map(item => {
            return (
              <h2 key={item.location.id}>
                {item.location.address} - ${item.location.price}
              </h2>
            )
          })}
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
  fillCart: () => dispatch(fillCart())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
)
