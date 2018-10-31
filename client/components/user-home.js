import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AllLocations from './all-locations';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
	const { email } = props;

	return (
		<div>
			<h1 className="creepyFont" id="centered">
				Welcome to HauntEz!
			</h1>
			{/*Admin: render + button top right of page to add products*/}
			{/*render dropdown for categories*/}
			{/*render all locations as an image grid*/}
			{/*render edit button next to each image*/}
			<AllLocations />
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		email: state.user.email
		//get locations from state
	};
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
	email: PropTypes.string
};
