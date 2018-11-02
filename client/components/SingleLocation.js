import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getOneLocation } from '../store';
import UpdateLocation from './UpdateLocation';
import Reviews from './Reviews';

class SingleLocation extends Component {
	componentDidMount() {
		let locationId = Number(this.props.match.params.locationId);
		this.props.getLocation(locationId);
	}

	render() {
		let singleLocation = this.props.singleLocation;
    
    render() { 
        let singleLocation = this.props.singleLocation
        let isAdmin = this.props.isAdmin;
        let locationReviews = singleLocation.reviews;

        return(
            <div id="singleLocation">
                <img src={singleLocation.imageUrl} className="singleViewImage" />
                <h2>{singleLocation.address}</h2>
                <h2>{singleLocation.description}</h2>
                <h3 className="red">Number of haunts available: {singleLocation.quantity}</h3>
                <h3>Price: ${singleLocation.price}</h3>
                <h3 className="red">Category: {singleLocation.category}</h3>
                
                <h2>Reviews</h2>
                {locationReviews && <Reviews reviews={singleLocation.reviews}/>}

                {isAdmin && (
                    <Link to={{pathname:`/singleLocation/${singleLocation.id}/update`, state: {singleLocation}}}>
                    <button type="button">Update Listing</button>
                    </Link>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    { 
        singleLocation: state.locations.selectedLocation,
        isAdmin: state.user.isAdmin
    }
)

const mapDispatchToProps = (dispatch) => ({
	getLocation: (id) => dispatch(getOneLocation(id))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleLocation));
