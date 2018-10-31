import axios from 'axios';

//ACTION TYPES
const GET_LOCATIONS = 'GET_LOCATIONS';

const GET_LOCATION = 'GET_LOCATION';
const ADD_NEW_LOCATION = 'ADD_NEW_LOCATION';
const UPDATE_LOCATION = 'UPDATE_LOCATION';
const SEARCH = 'SEARCH';

//INITIAL STATE
const defaultLocations = [];

// //ACTION CREATORS
// const getLocations = (locations) => ({ type: GET_LOCATIONS, locations });
// const addNewLocation = (location) => ({ type: ADD_NEW_LOCATION, location });
const searchDB = (input) => ({ type: SEARCH, input });
//INITIAL STATE
const initialState = {
	locations: [],
	selectedLocation: {}
};

//ACTION CREATORS
const getLocations = (locations) => ({ type: GET_LOCATIONS, locations });
const getLocation = (location) => ({ type: GET_LOCATION, location });
const addNewLocation = (location) => ({ type: ADD_NEW_LOCATION, location });
const updateExistingLocation = (location) => ({ type: UPDATE_LOCATION, location });

//THUNK CREATORS
export const search = (thing) => {
	return async (dispatch) => {
		const res = await axios.get(`api/search/${thing}`);
		console.log('found it', res.data);
		dispatch(searchDB(res.data));
	};
};
export const getAllLocations = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/locations');
		dispatch(getLocations(res.data || initialState.locations));
	} catch (error) {
		console.error(error);
	}
};

export const getOneLocation = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/locations/${id}`);
		dispatch(getLocation(res.data || initialState.locations));
		console.log('res.data', res.data);
	} catch (error) {
		console.error(error);
	}
};

export const getFilteredLocations = (category) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/locations/filter/${category}`);
		dispatch(getLocations(res.data || initialState.locations));
	} catch (error) {
		console.error(error);
	}
};

//to be refactored
export const addLocation = (address, imageUrl, quantity, description, category, price) => async (dispatch) => {
	try {
		const { data } = await axios.post('/api/locations', {
			category,
			address,
			description,
			quantity,
			price,
			imageUrl
		});
		console.log('data', data);
		dispatch(addNewLocation(data.location));
	} catch (err) {
		console.error(err);
	}
};

export const updateLocation = (updatedLocation) => async (dispatch) => {
	try {
		console.log('updatedLocation within thunk', updatedLocation);
		const data = await axios.put(`/api/locations/${updatedLocation.id}`, updatedLocation);
		console.log('updated data', data);
		dispatch(updateExistingLocation(data));
	} catch (err) {
		console.error(err);
	}
};

// REDUCER
export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_NEW_LOCATION:
			return { ...state, locations: [ ...locations, action.location ] };
		case GET_LOCATIONS:
			return { ...state, locations: action.locations };
		case GET_LOCATION:
			return { ...state, selectedLocation: action.location };
		case UPDATE_LOCATION:
			let locations = [ ...state.locations ];
			let locationToUpdateIdx = locations.findIndex((location) => location.id === action.location.id);
			let updatedLocation = { ...locations[locationToUpdateIdx], ...action.location };
			locations[locationToUpdateIdx] = updatedLocation;
			return { ...state, locations };
		case SEARCH:
			return { ...state, location: action.input };
		default:
			return state;
	}
}
