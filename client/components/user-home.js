<<<<<<< HEAD
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllLocations from './all-locations'
=======
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AllLocations from './all-locations';
import { Link } from 'react-router-dom';
>>>>>>> 1596cd0dc75c5952158aefb22bd55f6ac4e9bce5

/**
 * COMPONENT
 */
<<<<<<< HEAD
export const UserHome = props => {
  const {email} = props
  console.log('asdfas', props)
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
  )
}
=======
export const UserHome = (props) => {
	const { email, isAdmin } = props;

	return (
		<div>
			<h1 className="creepyFont" id="centered">
				Welcome to HauntEz!
			</h1>
			
			{/*ADMIN ONLY: Render + button top right of page to add products*/}
			{(isAdmin) ? <Link to='/addLocation'><h1>+</h1></Link> : <div />}
				
			<AllLocations />
		</div>
	);
};
>>>>>>> 1596cd0dc75c5952158aefb22bd55f6ac4e9bce5

/**
 * CONTAINER
 */
<<<<<<< HEAD
const mapState = state => {
  return {
    email: state.user.email
    //get locations from state
  }
}
=======
const mapState = (state) => {
	return {
		email: state.user.email,
		isAdmin: state.user.isAdmin
	};
};
>>>>>>> 1596cd0dc75c5952158aefb22bd55f6ac4e9bce5

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
