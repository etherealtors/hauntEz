import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fillCart, buyStuff, deleteFromOrder} from '../store'
import Checkout from './Checkout';

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
    // put something here
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
              <div key={item.id}>
              <h2 >
                {item.location.address} for ${item.location.price} x{item.quantity} = ${item.location.price*item.quantity}
              </h2> 
              <button type="button" onClick={() => this.handleDelete(item.id)}>Remove From Cart</button>
              </div>
              ) : null
              
            )
          })}
          <h3>Total: ${total}</h3>
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

const mapStateToProps = (state) => ({
	cart: state.orders.orders
});

const mapDispatchToProps = dispatch => ({
  fillCart: () => dispatch(fillCart()),
  buyStuff: status => dispatch(buyStuff(status)), 
  deleteFromOrder: itemId => dispatch(deleteFromOrder(itemId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingCart));
