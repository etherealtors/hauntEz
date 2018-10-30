import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

let categories = ['Manse', 'Boat', 'Shack', 'Apartment']
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
