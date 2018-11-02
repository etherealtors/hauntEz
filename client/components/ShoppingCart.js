import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fillCart} from '../store'

class ShoppingCart extends Component {
  componentDidMount() {
    this.props.fillCart(this.props.user.id)
  }

  render() {
    console.log('this.props.cart', this.props.cart)
    return (
      <div className="shopping-cart">
        {this.props.cart.map(item => {
          return <h2>{item.itemId}</h2>
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.orders.orders,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fillCart: id => dispatch(fillCart(id))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
)
