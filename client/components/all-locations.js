import {connect} from 'react-redux'
import React from 'react'
import {getAllLocations} from '../store'
import {Link} from 'react-router-dom'

class AllLocations extends React.Component {
  componentDidMount() {
    this.props.getAllLocations()
  }

  render() {
    return (
      <div>
        <div className="dropdown">
          <div className="dropdown-content">
            All Shack House Apartment Manse Castle Boat
          </div>
        </div>
        <div>
          {this.props.locations.map(location => (
            <div key={location.id}>
            <Link to={`/singleLocation/${location.id}`}>
              <img src={location.imageUrl} />
              {location.address} - ${location.price}
            </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locations: state.locations
})

const mapDispatchToProps = dispatch => ({
  getAllLocations: () => dispatch(getAllLocations())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllLocations)
