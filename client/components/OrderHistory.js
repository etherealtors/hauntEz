import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrderHistory } from '../store';

class OrderHistory extends Component {
	componentDidMount() {
		this.props.getOrderHistory();
	}

	render() {
		const orders = this.props.orders;
		return (
			<div>
				<h3>List of Orders</h3>
				<table>
					<tbody>
						<tr>
							<th>ID</th>
							<th>status</th>
							<th>quantity</th>
							<th>price</th>
						</tr>
						{orders.map((order, i) => {
							return order ? (
								<tr key={order.id}>
									<td>{order.orderId}</td>
									<td>{order.status}</td>
									<td>{order.quantity}</td>
									<td>{order.price}</td>
								</tr>
							) : null;
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	orders: state.orders.orders
});

const mapDispatchToProps = (dispatch) => ({
	getOrderHistory: () => dispatch(getOrderHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
