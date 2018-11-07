import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import SearchBar from './SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ handleClick, isLoggedIn, user, orders }) => (
	<div>
		<nav>
			<span id="logo">
				<img src="http://rs353.pbsrc.com/albums/r376/swfan67/1967/ghost.gif~c200" />
				{'    '}
				<h1 className="creepyFont"> HauntEZ </h1>
				{'     '}
				<img src="http://rs353.pbsrc.com/albums/r376/swfan67/1967/ghost.gif~c200" />
			</span>
			{isLoggedIn ? (
				<div className="nav-container">
					{/* The navbar will show these links after you log in */}
					<div>Hi, {user.name} </div>
					<Link to="/" className="links">
						Home
					</Link>
					<a className="links" href="#" onClick={handleClick}>
						Logout
					</a>
					<Link to="/cart" className="links">
						Cart ({orders.orders.length})
					</Link>
					<Link to="/orderHistory" className="links">
						Order History
					</Link>
					<SearchBar />
					<ToastContainer />
				</div>
			) : (
				<div className="nav-container">
					{/* The navbar will show these links before you log in */}
					<Link to="/" className="links">
						Home
					</Link>
					<Link to="/login" className="links">
						Login
					</Link>
					<Link to="/signup" className="links">
						Sign Up
					</Link>
					<Link to="/cart" className="links">
						Cart
					</Link>
					<SearchBar />
				</div>
			)}
		</nav>
		<hr />
	</div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.user.id,
		user: state.user,
		orders: state.orders
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout());
		}
	};
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
