import React, {Component} from 'react' 
import {connect} from 'react-redux';  
import {withRouter} from 'react-router-dom';
import {getOneLocation} from '../store'; 
import UpdateLocation from './UpdateLocation';

export default class SingleLocation extends Component{ 

    render() { 
        let singleLocation = this.props.location.state;

        return(
            <div>
                <img src={singleLocation.imageUrl} />
                <h2>{singleLocation.address}</h2>
                <h2>{singleLocation.description}</h2>
                <h3>Number of haunts available: {singleLocation.quantity}</h3>
                <h3>Price: ${singleLocation.price}</h3>
                <h3>Category: {singleLocation.category}</h3>
                
                <UpdateLocation singleLocation={singleLocation}/>
            </div>
        )
    }
}