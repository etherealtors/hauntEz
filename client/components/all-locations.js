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
          <select>
            {[
              'All',
              'Shack',
              'House',
              'Apartment',
              'Manse',
              'Castle',
              'Boat'
            ].map(type => (
              <option key={type} value={type} onClick={this.changeFilter}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          {this.props.locations.map(location => (
            <div key={location.id}>
              <img src={location.imageUrl} />
              {location.address} - ${location.price}
            </div>
          ))}
        </div>
      </div>
    )
  }


}

const mapStateToProps = (state) => ({
	locations: state.locations
});


const mapDispatchToProps = dispatch => ({
  getAllLocations: () => dispatch(getAllLocations()),
  getFilteredLocations: category => dispatch(getFilteredLocations(category))
})


export default connect(mapStateToProps, mapDispatchToProps)(AllLocations);
