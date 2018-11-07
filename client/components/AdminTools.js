import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import AddLocation from './AddLocation';
import UpdateCategory from './UpdateCategory';

class AdminTools extends React.Component {
	render() {
		return (
			<div>
				<h1>Admin Tools Page</h1>
				<h2>Product Management</h2>

				<AddLocation />

				{/*Create/remove categories/amenities*/}
				<UpdateCategory />

				{/*Manage availability of product:
              -Users should not be able to see product on homepage any more if not available
              -Single product page should say not available*/}

				<h2>Order Management</h2>
				{/*View a list of all orders*/}
				{/*Filter orders by status*/}
				{/*View specific order details and can update status*/}
				{/*Change status of order:
              Created->Processing, Processing-> Cancelled || Completed
          */}

				<h2>User Management</h2>
				{/*Promote other user accounts to admin status*/}
				{/*Delete user*/}
				{/*Trigger password reset for a user*/}
			</div>
		);
	}
}

export default AdminTools;
