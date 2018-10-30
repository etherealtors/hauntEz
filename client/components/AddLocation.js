import React, {Component} from 'react' 
import {connect} from 'react-redux';  
import {withRouter} from 'react-router-dom';
import {addLocation} from '../store/location'; 
//user uploading this will need to be decided/built somewhere 

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

    handleChange(event){ 
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit(event){ 
        event.preventDefault(); 
        console.log('reached handlesubmit', this.props.addLocation)
        this.props.addLocation(this.state.addressInput, this.state.imageInput, this.state.quantityInput, this.state.descriptionInput, this.state.category, this.state.priceInput)
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
            <div className ="add-location">
                <h2>Add a New Location</h2> 
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
        addLocation: (address, imageUrl, quantity, description, category, price) => dispatch(addLocation(address, imageUrl, quantity, description, category, price))
    }
)}

export default withRouter(connect(null, mapDispatchToProps)(AddLocation))
