import { connect } from 'react-redux';
import React from 'react';
import { getAllLocations } from '../store';

class AllLocations extends React.Component {
	componentDidMount() {
		this.props.getAllLocations();
	}

	render() {
		return (
			<div>
				<div className="dropdown">
					<div className="dropdown-content">All Shack House Apartment Manse Castle Boat</div>
				</div>
				<div className="displayAll">
					{this.props.locations.map((location) => (
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
		);
	}
}

const mapStateToProps = (state) => ({
	locations: state.locations
});

const mapDispatchToProps = (dispatch) => ({
	getAllLocations: () => dispatch(getAllLocations())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllLocations);
