import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fillCart, buyStuff, applyDiscountToOrder} from '../store'
import Checkout from './Checkout'
//import StripeCheckout from 'react-stripe-checkout';

class ShoppingCart extends Component {
  constructor() {
    super()
    this.state = {
      couponCode: ''
    }
    this.submitOrder = this.submitOrder.bind(this)
    this.applyDiscount = this.applyDiscount.bind(this)
    this.updateCouponField = this.updateCouponField.bind(this)
  }
  componentDidMount() {
    this.props.fillCart()
  }

  submitOrder() {
    this.props.buyStuff('Processing')
    // alert(
    //   'Your order has been placed. Thanks for shopping with HauntEZ, where our UX is as spooky as our customers!'
    // )
  }

  applyDiscount(event) {
    event.preventDefault()
    this.props.applyDiscount(this.props.cart[0].orderId, this.state.couponCode)
  }

  updateCouponField(event) {
    this.setState({
      couponCode: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div className="shopping-cart">
          {this.props.cart.map(item => {
            return (
              <div key={item.location.id}>
                <h2>
                  {item.location.address} - ${item.price}
                </h2>
              </div>
            )
          })}
          <form onSubmit={this.applyDiscount}>
            <input
              type="text"
              name="couponCode"
              onChange={this.updateCouponField}
              value={this.state.couponCode}
            />
            <button type="submit">Apply Discount Code</button>
          </form>
        </div>

        <Checkout
          // name={this.props.cart.location.address}
          // description={this.props.cart.location.description}
          // amount={this.props.cart.location.price}
          onSubmit={this.submitOrder}
        />
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
  applyDiscount: (id, code) => dispatch(applyDiscountToOrder(id, code))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
)
