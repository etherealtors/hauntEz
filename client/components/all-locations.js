import {connect} from 'react-redux'
import React from 'react'
import {getAllLocations, getFilteredLocations} from '../store'

class AllLocations extends React.Component {
  constructor() {
    super()
    this.changeFilter = this.changeFilter.bind(this)
  }

  componentDidMount() {
    this.props.getAllLocations()
  }

  changeFilter(event) {
    if (event.target.value === 'All') {
      this.props.getAllLocations()
    } else {
      this.props.getFilteredLocations(event.target.value)
    }
  }

  render() {
    return (
      <div>
        <div className="dropdown">
          <select onChange={this.changeFilter}>
            {[
              'All',
              'Shack',
              'House',
              'Apartment',
              'Manse',
              'Castle',
              'Boat'
            ].map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="displayAll">
          {this.props.locations.map(location => (
            <div key={location.id} className="toDisplay">
              <img src={location.imageUrl} className="homepageImg" />
              <div className="formatListing">
                {' '}
                {location.address} - ${location.price}
              </div>
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
  getAllLocations: () => dispatch(getAllLocations()),
  getFilteredLocations: category => dispatch(getFilteredLocations(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllLocations)
