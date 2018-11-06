import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fillCart, buyStuff, deleteFromOrder, addToOrders} from '../store'
import Checkout from './Checkout';

const isLoggedIn = false; 

class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      userCart: null
      //prob have to update to more
    }
    this.submitOrder = this.submitOrder.bind(this)
    this.handleDelete = this.handleDelete.bind(this); 
  }
  componentDidMount() {
    if (isLoggedIn){ 
      this.props.fillCart()
    }
    else { 
      this.setState({userCart: JSON.parse(localStorage.getItem('cart'))}); 
      console.log('state', this.state); 
      console.log('state cart', this.state.userCart); 
    }
  }

  handleDelete(itemId){ 
    if (isLoggedIn){ 
      this.props.deleteFromOrder(itemId)
    }
    else { 
      let cart = JSON.parse(localStorage.getItem('cart'))
      delete cart[itemId]; 
      localStorage.setItem('cart', JSON.stringify(cart)); 
      this.setState({userCart: cart})
    }
    
  }

  async updateDatabase(){ 
    let cartObj = this.state.userCart; 

      for (let key in cartObj) { 
        if (cartObj.hasOwnProperty(key)){ 
          const itemObj = cartObj[key]
          const newObj = { 
            price: itemObj.price, 
            locationId: itemObj.id, 
            quantity: itemObj.quantity, 
            userId: 999
          }
          await this.props.addToOrders(itemObj.price, itemObj.id, 999, itemObj.quantity); 
          //then need to update the status on this
        }
      }
      localStorage.clear(); 
      this.setState({userCart: null})
      console.log('state', this.state)
  }

  submitOrder() {
    if (isLoggedIn) { 
      this.props.buyStuff('Processing')
    }
  }

  render() {

    let total = 0; 
    let cart = null; 
    if (isLoggedIn) { 
      cart = this.props.cart
    } else {
      //map through object keys and push into array 
      cart = []; 
      let cartObj = this.state.userCart; 
      for (let key in cartObj) { 
        if (cartObj.hasOwnProperty(key)){ 
          cart.push(cartObj[key]); 
        }
      }
    }
    return (
      
      <div>
        <div className="shopping-cart">         
          {cart ? ( 
            cart.map(item => {
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
              ) : <div></div>
              
            )
          })) : <div></div>}
          <h3>Total: ${total}</h3>
        </div>
        <button type="button" onClick={this.updateDatabase}>CLICKKK</button>
        <div onClick={this.addGuestOrder}>
				<Checkout
					// name={this.props.cart.location.address}
					// description={this.props.cart.location.description}
					// amount={this.props.cart.location.price}
					onSubmit={this.submitOrder}
				/>
        </div>
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
  deleteFromOrder: itemId => dispatch(deleteFromOrder(itemId)), 
  addToOrders: (price, locationId, userId, quantity) =>dispatch(addToOrders({price: price, locationId: locationId, userId: userId, quantity: quantity}))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingCart));
