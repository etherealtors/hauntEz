import { connect } from 'react-redux';
import React from 'react';

import { getAllLocations, getFilteredLocations } from '../store';
import { getAllCategories } from '../store/categories'
import { Link } from 'react-router-dom';

class AllLocations extends React.Component {
	constructor() {
		super();
		this.changeFilter = this.changeFilter.bind(this);
	}

	componentDidMount() {
		this.props.getAllLocations();
		this.props.getAllCategories();
	}

	changeFilter(event) {
		if (event.target.value === 'All') {
			this.props.getAllLocations();
		} else {
			this.props.getFilteredLocations(event.target.value);
		}
	}

	render() {
		let orderedCategories = this.props.categories.sort((a, b) => {
			if(a.name <= b.name) {return -1}
			else {return 1}
		});

		return (
			<div>
				<div className="dropdown">
					<select onChange={this.changeFilter}>
						<option value="All">All</option>
						{orderedCategories.map((type) => (
							(type.categoryType === 'houseType') ?
							<option key={type.id} value={type.name}>
								{type.name}
							</option> :
							null
						))}
					</select>
				</div>
				<div className="displayAll">
					{this.props.locations.map((location) => (
						<div key={location.id} className="toDisplay">
							<Link
								to={{ pathname: `/singleLocation/${location.id}`, state: location }}
								className="links"
							>
								<img src={location.imageUrl} className="homepageImg" />
								<div className="formatListing">
									{' '}
									{location.address} - ${location.price}
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	locations: state.locations.locations,
	categories: state.categories.categories
});

const mapDispatchToProps = (dispatch) => ({
	getAllLocations: () => dispatch(getAllLocations()),
	getFilteredLocations: (category) => dispatch(getFilteredLocations(category)),
	getAllCategories: () => dispatch(getAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllLocations);
