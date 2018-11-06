import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fillCart, buyStuff } from '../store';
import Checkout from './Checkout';
//import StripeCheckout from 'react-stripe-checkout';

class ShoppingCart extends Component {
	constructor() {
		super();
		this.submitOrder = this.submitOrder.bind(this);
	}
	componentDidMount() {
		this.props.fillCart();
	}

	submitOrder() {
		this.props.buyStuff('Processing');
		// alert(
		//   'Your order has been placed. Thanks for shopping with HauntEZ, where our UX is as spooky as our customers!'
		// )
	}

	render() {
		console.log('this.props.cart', this.props.cart);
		return (
			<div>
				<div className="shopping-cart">
					{this.props.cart.map((item) => {
						return (
							<div key={item.location.id}>
								<h2>
									{item.location.address} - ${item.location.price}
								</h2>
							</div>
						);
					})}
				</div>

				<Checkout
					// name={this.props.cart.location.address}
					// description={this.props.cart.location.description}
					// amount={this.props.cart.location.price}
					onSubmit={this.submitOrder}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	cart: state.orders.orders
});

const mapDispatchToProps = (dispatch) => ({
	fillCart: () => dispatch(fillCart()),
	buyStuff: (status) => dispatch(buyStuff(status))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingCart));
