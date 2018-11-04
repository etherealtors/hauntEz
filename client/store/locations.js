import axios from 'axios';
import history from '../history';

//ACTION TYPES
const GET_LOCATIONS = 'GET_LOCATIONS';

const GET_LOCATION = 'GET_LOCATION';
const ADD_NEW_LOCATION = 'ADD_NEW_LOCATION';
const UPDATE_LOCATION = 'UPDATE_LOCATION';
const ADD_REVIEW = 'ADD_REVIEW';

//INITIAL STATE
const defaultLocations = [];

//INITIAL STATE
const initialState = {
	locations: [],
	selectedLocation: {},
	content: ''
};

//ACTION CREATORS
const getLocations = (locations) => ({ type: GET_LOCATIONS, locations });
const getLocation = (location) => ({ type: GET_LOCATION, location });
const addNewLocation = (location) => ({ type: ADD_NEW_LOCATION, location });
const updateExistingLocation = (location) => ({ type: UPDATE_LOCATION, location });
const addNewReview = (content) => ({ type: ADD_REVIEW, content });

//THUNK CREATORS
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
export const getSearchResults = (question) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/search/${question}`);
		dispatch(getLocations(res.data[0]));
	} catch (err) {
		console.error(err);
	}
};
export const addReview = (content, id, userId, rating) => async (dispatch) => {
	try {
		console.log('ID', content);

		const { data } = await axios.post(`/api/locations/${id}`, {
			content: content,
			locationId: id,
			userId: userId,
			rating: rating
		});
		console.log('DATA:', data);
		dispatch(addNewReview(data));
	} catch (err) {
		console.error(err);
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
		dispatch(addNewLocation(data));
		history.push(`/singleLocation/${data.id}`);
	} catch (error) {
		console.error(error);
	}
};

export const updateLocation = (updatedLocation) => async (dispatch) => {
	try {
		const { data } = await axios.put(`/api/locations/${updatedLocation.id}`, updatedLocation);
		dispatch(updateExistingLocation(data));
		history.push(`/singleLocation/${data.id}`);
	} catch (error) {
		console.error(error);
	}
};

// REDUCER
export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_NEW_LOCATION:
			return { ...state, locations: [ ...state.locations, action.location ] };
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
		case ADD_REVIEW:
			return { ...state, content: [ ...state.content, action.content.content ] };
		default:
			return state;
	}
}
