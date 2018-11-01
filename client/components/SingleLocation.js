import React, {Component} from 'react' 
import {connect} from 'react-redux';  
import {withRouter, Link} from 'react-router-dom';
import {getOneLocation} from '../store'; 
import UpdateLocation from './UpdateLocation';
import Reviews from './Reviews';

class SingleLocation extends Component{ 
    // constructor(props){ 
    //     super(props); 
    // }

    componentDidMount(){ 
        let locationId = Number(this.props.match.params.locationId); 
        this.props.getLocation(locationId); 
    }

    render() { 
        let singleLocation = this.props.singleLocation
        
        let locationReviews = singleLocation.reviews;

        return(
            <div>
                <img src={singleLocation.imageUrl} />
                <h2>{singleLocation.address}</h2>
                <h2>{singleLocation.description}</h2>
                <h3>Number of haunts available: {singleLocation.quantity}</h3>
                <h3>Price: ${singleLocation.price}</h3>
                <h3>Category: {singleLocation.category}</h3>
                
                <h2>Reviews</h2>
                {locationReviews && <Reviews reviews={singleLocation.reviews}/>}

                <Link to={{pathname:`/singleLocation/${singleLocation.id}/update`, state: {singleLocation}}}>
                <button type="button">Update Listing</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    { 
        singleLocation: state.locations.selectedLocation
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        getLocation: (id) => dispatch(getOneLocation(id))
    }
)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleLocation))