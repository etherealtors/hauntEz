import React from 'react';

const Reviews = (props) => {
	const reviews = props.singleLocation.reviews;

	return reviews.map((review, i) => (
		<div key={review.id} className="review row">
			<div className="column">
				<h5>Rating: {review.rating}</h5>
				<div>
					{props.singleLocation.reviews[i].user.name}: {review.content}
				</div>
			</div>
		</div>
	));
};

export default Reviews;
