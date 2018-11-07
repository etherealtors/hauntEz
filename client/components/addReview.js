import React from 'react';
import { connect } from 'react-redux';
import store, { addReview } from '../store';
import { withRouter } from 'react-router-dom';

class AddReview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			rating: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	async handleSubmit(event) {
		event.preventDefault();
		const user = this.props.location.user.id;
		const id = this.props.location.id;
		await this.props.addReview(this.state.content, id, user, this.state.rating);
		this.setState({
			content: '',
			rating: ''
		});
	}

	render() {
		return (
			<div>
				<h2>Add Review</h2>
				<form onSubmit={this.handleSubmit}>
					<label>
						Comment:
						<input type="text" name="content" value={this.state.content} onChange={this.handleChange} />
					</label>
					<label>
						Rating:
						<input
							type="number"
							min="1"
							max="5"
							name="rating"
							value={this.state.rating}
							onChange={this.handleChange}
						/>
					</label>
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		location: state.locations.selectedLocation
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addReview: (content, id, userId, rating) => dispatch(addReview(content, id, userId, rating))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddReview));
