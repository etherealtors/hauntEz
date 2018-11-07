import React from 'react';
import { connect } from 'react-redux';

class Reviews extends React.Component {
	render() {
		return this.props.reviews.map((review, i) => (
			<div key={review.id} className="review row">
				<div className="column">
					<img src={this.props.reviews[i].user.image} className="reviewPic" />
					<h5>Rating: {review.rating}</h5>
					<div>
						{this.props.reviews[i].user.name}: <div />
						{review.content}
					</div>
				</div>
			</div>
		));
	}
}

const mapState = (state) => {
	return { reviews: state.locations.selectedLocation.reviews };
};

export default connect(mapState)(Reviews);
