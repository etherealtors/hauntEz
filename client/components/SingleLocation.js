import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getOneLocation } from '../store';
import UpdateLocation from './UpdateLocation';

class SingleLocation extends Component {
	componentDidMount() {
		let locationId = Number(this.props.match.params.locationId);
		this.props.getLocation(locationId);
	}

	render() {
		let singleLocation = this.props.singleLocation;

		return (
			<div id="singleLocation">
				<img src={singleLocation.imageUrl} className="singleViewImage" />
				<h2 className="red">{singleLocation.address}</h2>
				<h2>{singleLocation.description}</h2>
				<h3>
					<div className="red">Number of haunts available:</div>
					{singleLocation.quantity}
				</h3>
				<div />{' '}
				<h3>
					{' '}
					<div className="red">Price:</div> ${singleLocation.price}
				</h3>
				<h3>
					<div className="red">Category:</div>
					{singleLocation.category}
				</h3>
				<Link to={{ pathname: `/singleLocation/${singleLocation.id}/update`, state: { singleLocation } }}>
					<button type="button">Update Listing</button>
				</Link>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	singleLocation: state.locations.selectedLocation
});

const mapDispatchToProps = (dispatch) => ({
	getLocation: (id) => dispatch(getOneLocation(id))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleLocation));
