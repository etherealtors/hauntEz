import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fillCart, buyStuff, deleteFromOrder} from '../store'
import Checkout from './Checkout';

class ShoppingCart extends Component {
  constructor() {
    super()
    this.state = {
      totalAmount: 0,
      totalQuantity: 0,
      itemsAllAvailable: true
    }
    this.submitOrder = this.submitOrder.bind(this)
    this.handleDelete = this.handleDelete.bind(this); 
    this.setInitialState = this.setInitialState.bind(this);
  }

  setInitialState() {
    let totalAmount = 0;
    let totalQuantity = 0;
    let itemsAllAvailable = true;
  
    for(let i = 0; i < this.props.cart.length; i++) {
      let currItem = this.props.cart[i];
     
      totalAmount += (currItem.location.price * currItem.quantity);
      totalQuantity += currItem.quantity;
      if(currItem.quantity > currItem.location.quantity) {
        itemsAllAvailable = false;
      }
    }
   
    this.setState({
      totalAmount,
      totalQuantity,
      itemsAllAvailable
    });
  }

  async componentDidMount() {
    await this.props.fillCart();
    this.setInitialState();
  }

  async handleDelete(itemId){ 
    await this.props.deleteFromOrder(itemId)
    this.setInitialState();
  }

  async submitOrder() {
    await this.props.buyStuff('Processing')
    this.setInitialState();
  }

  render() {
    return (
      <div>
        <div className="shopping-cart">
          {this.props.cart.map(item => {
            return (
              item.location ? (
              <div key={item.id}>
              <h2 >
                {item.location.address} for ${item.location.price} x {item.quantity} = ${item.location.price*item.quantity}

                {(item.quantity > item.location.quantity) ?
                <p>*Low on stock. Please reduce the number of items and try again</p> :
                null}
              </h2> 
              <button type="button" onClick={() => this.handleDelete(item.id)}>Remove From Cart</button>
              </div>
              ) : null
            )
          })}
          <h3>Total: ${this.state.totalAmount}</h3>
        </div>

        {(this.state.totalQuantity > 0 && this.state.itemsAllAvailable) ?
				<Checkout
          amount={this.state.totalAmount}
					onSubmit={this.submitOrder}
        /> :
        <h1>Cart is empty or needs modifying</h1>
        }

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
