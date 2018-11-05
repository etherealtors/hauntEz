import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fillCart, buyStuff } from '../store';
import Checkout from './Checkout';
import StripeCheckout from 'react-stripe-checkout';

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
							<h2 key={item.location.id}>
								{item.location.address} - ${item.location.price}
							</h2>
						);
					})}
				</div>
				<button type="submit">Submit order!</button>
				<Checkout />
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

{
	/* <form action="Processing" onSubmit={this.submitOrder} method="POST">
<script
  src="https://checkout.stripe.com/checkout.js"
  className="stripe-button"
  data-key={process.env.STRIPE_PUBLISHABLE_KEY}
  data-amount="420"
  data-name="Stripe.com"
  data-description="Blaze it"
  data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
  data-locale="auto"
  data-zip-code="true"
/>
</form> */
}
