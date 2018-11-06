import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fillCart, buyStuff, deleteFromOrder} from '../store'
import Checkout from './Checkout';

class ShoppingCart extends Component {
  constructor() {
    super()
    this.state = {
      totalAmount: 0
    }
    this.submitOrder = this.submitOrder.bind(this)
    this.handleDelete = this.handleDelete.bind(this); 
  }
  async componentDidMount() {
    await this.props.fillCart();
    this.calculateTotal();
  }

  handleDelete(itemId){ 
    this.props.deleteFromOrder(itemId)
  }

  submitOrder(success) {
    console.log("SUCCESS? ", success)
    console.log("cart ", this.props.cart)
    console.log("TOTAL AMOUNT ", this.state.totalAmount)
    this.props.buyStuff('Processing')

    this.setState({
      totalAmount: 0
    })
    // put something here
  }

  calculateTotal() {
    let total = this.props.cart.reduce((prevVal, currItem) => {
      return prevVal + (currItem.location.price * currItem.quantity);
    }, 0);
    this.setState({
      totalAmount: total
    });
  }

  render() {
    console.log("TOTAL ", this.state.totalAmount)
    return (
      <div>
        <div className="shopping-cart">
          {this.props.cart.map(item => {
            return (
              item.location ? (
              <div key={item.id}>
              <h2 >
                {item.location.address} for ${item.location.price} x{item.quantity} = ${item.location.price*item.quantity}
              </h2> 
              <button type="button" onClick={() => this.handleDelete(item.id)}>Remove From Cart</button>
              </div>
              ) : null
            )
          })}
          <h3>Total: ${this.state.totalAmount}</h3>
        </div>
				<Checkout
          amount={this.state.totalAmount}
					onSubmit={this.submitOrder}
				/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
	cart: state.orders.orders
});

const mapDispatchToProps = dispatch => ({
  fillCart: () => dispatch(fillCart()),
  buyStuff: status => dispatch(buyStuff(status)), 
  deleteFromOrder: itemId => dispatch(deleteFromOrder(itemId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingCart));
