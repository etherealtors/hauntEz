import React from 'react';
import axios from 'axios';
import store, { getSearchResults } from '../store';

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	handleSubmit(event) {
		event.preventDefault();
		store.dispatch(getSearchResults(this.state.query));
	}

	render() {
		return (
			<div>
				{' '}
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						placeholder="Search.."
						name="query"
						value={this.state.query}
						onChange={this.handleChange}
						className="search-bar"
					/>{' '}
					<button type="submit">
						<img
							src="https://image.freepik.com/free-icon/magnifying-glass_318-79044.jpg"
							className="searchButton"
						/>
					</button>
				</form>
			</div>
		);
	}
}
