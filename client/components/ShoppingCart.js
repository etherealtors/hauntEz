import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fillCart, buyStuff, applyDiscountToOrder, addToOrders, deleteFromOrder} from '../store'
import Checkout from './Checkout'
//import StripeCheckout from 'react-stripe-checkout';
const isLoggedIn = true; 

class ShoppingCart extends Component {
    constructor() {
    super()
    this.state = {
      totalAmount: 0,
      totalQuantity: 0,
      itemsAllAvailable: true,
      userCart: null,
      processed: false,
      couponCode: ''
    }
    this.submitOrder = this.submitOrder.bind(this)
    this.handleDelete = this.handleDelete.bind(this); 
    this.setInitialState = this.setInitialState.bind(this);
    this.updateDatabase = this.updateDatabase.bind(this); 
    this.applyDiscount = this.applyDiscount.bind(this)
    this.updateCouponField = this.updateCouponField.bind(this)
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
    if (this.props.isUser.name){ 
      await this.props.fillCart(); 
      this.setInitialState();
    }
    else { 
      this.setState({userCart: JSON.parse(localStorage.getItem('cart'))}); 
      console.log('state', this.state); 
      console.log('state cart', this.state.userCart); 
    }
    
  }
  
   async handleDelete(itemId){ 
    if (this.props.isUser.name){ 
      await this.props.deleteFromOrder(itemId); 
      this.setInitialState();
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
    let totalAmount = 0; 
    let totalQuantity = 0; 

      for (let key in cartObj) { 
        if (cartObj.hasOwnProperty(key)){ 
          const itemObj = cartObj[key]
          await this.props.addToOrders(itemObj.price, itemObj.id, 999, itemObj.quantity); 
          totalAmount += itemObj.price; 
          totalQuantity += itemObj.quantity; 
          //then need to update the status on this
        }
      }
      console.log(totalAmount); 
      this.setState({totalAmount, totalQuantity})
      this.setState({processed: true})
      // localStorage.clear(); 
      // this.setState({userCart: null})
      // console.log('state', this.state)
  }


  async applyDiscount(event) {
    event.preventDefault()
    await this.props.applyDiscount(this.props.cart[0].orderId, this.state.couponCode)
  }
  
   async submitOrder() {
    // if (isLoggedIn) { 
      await this.props.buyStuff('Processing')
      this.setInitialState();
      this.setState({userCart:null})
      localStorage.clear(); 
    // }
  }

  updateCouponField(event) {
    this.setState({
      couponCode: event.target.value
    })
  }

  render() {
    let cart = null; 
    if (this.props.isUser.name) { 
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
          {this.props.cart.map(item => {
            return (
              <div key={item.location.id}>
                <h2>
                  {item.location.address} - ${item.price}
                </h2>
              </div>
            )
          })}
        </div>
            
                return (
      <div>
        <div className="shopping-cart">         
          {cart ? ( 
            cart.map(item => {
       
            return (
              item.location ? (
              <div key={item.id}>
              <h2 >
                {item.location.address} for ${item.location.price} x {item.quantity} = ${item.price*item.quantity}
                {(item.quantity > item.location.quantity) ?
                <p>*Low on stock. Please reduce the number of items and try again</p> :
                null}
              </h2> 
              <button type="button" onClick={() => this.handleDelete(item.id)}>Remove From Cart</button>
              </div>

              ) : null
              
            )})
            ) : null}
            <form onSubmit={this.applyDiscount}>
            <input
              type="text"
              name="couponCode"
              onChange={this.updateCouponField}
              value={this.state.couponCode}
            />
            <button type="submit">Apply Discount Code</button>
          </form>
          <h3>Total: ${this.state.totalAmount}</h3>
        </div>
        {this.props.isUser.name|| this.state.processed  ? null : (<button type="button" onClick={this.updateDatabase}>Click to Process Your Order</button>)}
       
        {/* {(true) ?           */}
      {(this.state.totalQuantity > 0 ) ?
      // && this.state.itemsAllAvailable
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
  isUser: state.user,
	cart: state.orders.orders
});

const mapDispatchToProps = dispatch => ({
  fillCart: () => dispatch(fillCart()),
  buyStuff: status => dispatch(buyStuff(status)), 
  applyDiscount: (id, code) => dispatch(applyDiscountToOrder(id, code)),
  deleteFromOrder: itemId => dispatch(deleteFromOrder(itemId)), 
  addToOrders: (price, locationId, userId, quantity) =>dispatch(addToOrders({price: price, locationId: locationId, userId: userId, quantity: quantity}))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
)
