import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import store, {logout} from '../store'
import SearchBar from './SearchBar'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <span id="logo">
        <img src="http://rs353.pbsrc.com/albums/r376/swfan67/1967/ghost.gif~c200" />
        {'    '}
        <h1 className="creepyFont"> HauntEZ </h1>
        {'     '}
        <img src="http://rs353.pbsrc.com/albums/r376/swfan67/1967/ghost.gif~c200" />
      </span>
      <SearchBar />
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">Home</Link>
          <Link to="/cart" className="links">
            Cart
          </Link>
          <div>Hi, USER.NAME</div>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
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
          <Link to="/addLocation" className="links">
            AddLocation
          </Link>
          <Link to="/cart" className="links">
            Cart
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
    //add username to state
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
