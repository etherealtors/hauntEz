import React from 'react';

const Reviews = (props) => {
	const reviews = props.reviews;
	return reviews.map((review) => (
		<div key={review.id} className="review row">
			<div className="column">
				<h1>User Name</h1>
				<h5>Rating: {review.rating}</h5>
				<div>Review: {review.content}</div>
			</div>
		</div>
	));
};

export default Reviews;
