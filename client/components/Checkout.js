import Axios from 'axios';
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const PAYMENT_SERVER_URL =
	process.env.NODE_ENV === 'production' ? 'http://hauntEz.herokuapp.com' : 'http://localhost:8080/payments';

const CURRENCY = 'USD';
const fromDollarToCent = (amount) => Math.round(amount * 100);
const successPayment = (data) => {
	alert('Payment Successful');
};

const errorPayment = (data) => {
	alert('Payment Error');
};

const onToken = (amount, description, handleSubmit) => async (token) => {
	try {
		await Axios.post('/api/payments', {
			description,
			source: token.id,
			currency: CURRENCY,
			amount: fromDollarToCent(amount)
		})
		handleSubmit("success")
	}
	catch (err) {
		errorPayment();
	}
}

const Checkout = (props) => {
	return (
		<StripeCheckout
			name="Demo Site"
			description="Widget"
			amount={fromDollarToCent(props.amount)}
			token={onToken(props.amount, "Payment EZ", props.onSubmit)}
			currency={CURRENCY}
			stripeKey="pk_test_pewWwrgncbREyJzeNYGTAX5v"
		/>
	);
};

export default Checkout;
