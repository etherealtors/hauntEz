import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllLocations from './all-locations'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isAdmin} = props

  return (
    <div>
      <h1 className="creepyFont" id="centered">
        Welcome to HauntEz!
      </h1>

      {/*ADMIN ONLY: Render + button top right of page to add products*/}
      {isAdmin ? (
        <Link to="/addLocation">
          <h1>+</h1>
        </Link>
      ) : (
        <div />
      )}

      <AllLocations />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
