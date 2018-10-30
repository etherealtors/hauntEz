import React, {Component} from 'react' 
import {connect} from 'react-redux';  
import {withRouter} from 'react-router-dom';
import {updateLocation} from '../store/locations'; 
//user uploading this will need to be decided/built somewhere 
//also does not have amenities 

class AddLocation extends Component { 
    constructor(props) { 
        super(props); 
        this.state = { 
            addressInput: '', 
            imageInput: '', 
            quantityInput: '', 
            descriptionInput: '', 
            priceInput:'',
            category: ''
        }
        this.handleChange= this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    } 

    componentDidMount(){ 
        const locationId = Number(this.props.match.params.locationId); 
        console.log('update locationID', locationId); 
    }

    handleChange(event){ 
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit(event){ 
        event.preventDefault(); 
        console.log('reached handlesubmit', this.props.addLocation)
        const updatedLocation = {...this.state}
        this.props.updateLocation(updatedLocation, locationId)
        this.setState({
            addressInput: '', 
            imageInput: '', 
            quantityInput: '', 
            descriptionInput: '', 
            priceInput: '',
            category: '', 
        })
    }

    render(){ 
        console.log('addLocation')
        console.log('state', this.state); 
        return(
            <div className ="update-location">
                <h2>Update a Location</h2> 
                <form> 
                    <label> 
                        Select Listing Type: 
                        <input type="radio" name="category" value="Shack" onChange={this.handleChange}/>Shack
                        <input type="radio" name="category" value="House" onChange={this.handleChange}/>House
                        <input type="radio" name="category" value="Apartment" onChange={this.handleChange}/>Apartment
                        <input type="radio" name="category" value="Manse" onChange={this.handleChange}/>Manse
                        <input type="radio" name="category" value="Castle" onChange={this.handleChange}/>Castle
                        <input type="radio" name="category" value="Boat" onChange={this.handleChange}/>Boat
                    </label>
                    <label> 
                        Address: 
                        <input type="text" name="addressInput" value={this.state.addressInput} onChange={this.handleChange}/>
                    </label>
                    <label> 
                        Description: 
                        <input type="text" name="descriptionInput" value={this.state.descriptionInput} onChange={this.handleChange}/>
                    </label>
                    <label> 
                        Number of Available Haunts: 
                        <input type="number" name="quantityInput" value={this.state.quantityInput} onChange={this.handleChange}/>
                    </label>
                    <label> 
                        Price per Haunt: 
                        <input type="number" name="priceInput" value={this.state.priceInput} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Image URL: 
                        <input type="text" name="imageInput" value={this.state.imageInput} onChange={this.handleChange}/> 
                    </label>
                    <button type="button" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('reached map dispatch to props')
    return (
    { 
        updateLocation: (updatedLoc, locationId) => dispatch(updateLocation(updatedLoc, locationId))
    }
)}

export default withRouter(connect(null, mapDispatchToProps)(AddLocation))
