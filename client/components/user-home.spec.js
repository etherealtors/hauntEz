/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UserHome } from './user-home';
import AllLocations from './all-locations';
import Navbar from './navbar';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('UserHome', () => {
	let userHome;

	beforeEach(() => {
		userHome = shallow(<UserHome email="cody@email.com" />);
	});

	it('renders the email in an h1', () => {
		expect(userHome.find('h1').text()).to.be.equal('Welcome to HauntEz!');
	});
});
// describe('<AllLocations />component', () => {
// 	let allLocations;

// 	beforeEach('Create component', () => {
// 		allLocations = shallow(<AllLocations />);
// 	});
// 	it('populates site with list of locations in the database', () => {

//   });

// });
describe('<Navbar /> component', () => {
	const navbar = shallow(<Navbar />);
	expect(navbar.find('Link')).to.have.length(4);
});
