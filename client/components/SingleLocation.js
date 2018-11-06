import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getOneLocation } from '../store';
import UpdateLocation from './UpdateLocation';
import Reviews from './Reviews';
import AddReview from './addReview';
import {addToOrders} from '../store'

let isLoggedIn = true; 

class SingleLocation extends Component {
    constructor(props) {
			super(props)
			this.state = { 
				quantity: 1
			}

			this.handleClick = this.handleClick.bind(this)
			this.createDropDown = this.createDropDown.bind(this); 
			this.handleChange = this.handleChange.bind(this); 
	}
	
	createDropDown(){ 
		let optionNum = []
		for (let i = 1; i <= this.props.singleLocation.quantity; i++){ 
			optionNum.push(<option value={`${i}`}>{i}</option>); 
		}
		return optionNum; 

	}

  
	componentDidMount() {
		console.log('isUser?', this.props.isUser.name); 
		let locationId = Number(this.props.match.params.locationId);
		this.props.getLocation(locationId);
	}
	
	handleChange(event){
		this.setState({quantity: event.target.value})
	}
  
  handleClick() {
		if (this.props.isUser.name){ 
			this.props.addToOrders(
				this.props.singleLocation.price,
				this.props.singleLocation.id,
				this.props.user.id, 
				this.state.quantity
			)
		}

	

		else { 
			// localStorage.clear(); 
			let cart = JSON.parse(localStorage.getItem('cart')); 
			let orderToStore = {price: this.props.singleLocation.price, quantity: Number(this.state.quantity), id: this.props.singleLocation.id, location: this.props.singleLocation } 

			if (cart) { 
				if(cart[orderToStore.id]){ 
					cart[orderToStore.id].quantity = cart[orderToStore.id].quantity + orderToStore.quantity; 
					localStorage.setItem('cart', JSON.stringify(cart)); 
				} else { 
					cart[orderToStore.id] = orderToStore; 
					localStorage.setItem('cart', JSON.stringify(cart))
				}
			}

			else { 
				const cartObj = {}; 
				cartObj[orderToStore.id] = orderToStore; 
				localStorage.setItem('cart', JSON.stringify(cartObj)); 
				
			}
			console.log(JSON.parse(localStorage.getItem('cart'))); 

		}

    
  }

	render() {
		let singleLocation = this.props.singleLocation;
		let isAdmin = this.props.isAdmin;
		let locationReviews = singleLocation.reviews;
		let isUser = this.props.isUser;
		return (
			<div id="singleLocation">
				<img src={singleLocation.imageUrl} className="singleViewImage" />
				<h2>{singleLocation.address}</h2>
				<h2>{singleLocation.description}</h2>
				{singleLocation.user && (
					<div>
						<h2 className="red">Sold By: </h2>
						<h2>{singleLocation.user.name}</h2>{' '}
						<img src={singleLocation.user.image} className="reviewPic" />
					</div>
				)}
				<h3 className="red">Number of haunts available: {singleLocation.quantity}</h3>
				<h3>Price: ${singleLocation.price}</h3>
        <h3 className="red">Category: {singleLocation.category}</h3>
				<select onChange={this.handleChange}>
					<label>Item Quantity: </label>
					{this.createDropDown()}
				</select>
        <button type="button" onClick={this.handleClick}>
          Add To Cart
        </button>
				<h3 className="red">Category: {singleLocation.category}</h3>

				<h2>Reviews</h2>
				{locationReviews && <Reviews singleLocation={singleLocation} />}
				<div id="admin">
					{isAdmin && (
						<div>
							<Link
								to={{
									pathname: `/singleLocation/${singleLocation.id}/update`,
									state: { singleLocation }
								}}
							>
								<button type="button">Update Listing</button>
							</Link>
							<div>
								<AddReview />
							</div>
						</div>
					)}
					{isUser.name && <AddReview />}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAdmin: state.user.isAdmin,
	isUser: state.user,
  singleLocation: state.locations.selectedLocation,
  user: state.user,
});
const mapDispatchToProps = dispatch => ({
  getLocation: id => dispatch(getOneLocation(id)),
  addToOrders: (price, locationId, userId, quantity) =>
    dispatch(
      addToOrders({price: price, locationId: locationId, userId: userId, quantity: quantity})
    )
})
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleLocation)
)
