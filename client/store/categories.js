import axios from 'axios';
import history from '../history';

//ACTION TYPES
const GET_CATEGORIES = 'GET_CATEGORIES';
const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY';
const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

//INITIAL STATE
const initialState = {
	categories: []
};

//ACTION CREATORS
const getCategories = (categories) => ({ type: GET_CATEGORIES, categories });
const addNewCategory = (category) => ({type: ADD_NEW_CATEGORY, category});
const removeCategory = (id) => ({type: REMOVE_CATEGORY, id});

//THUNK CREATORS
export const getAllCategories = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/categories');
		dispatch(getCategories(res.data || initialState.categories));
	} catch (error) {
		console.error(error);
	}
};

export const addCategory = (category) => async (dispatch) => {
    try {
        const res = await axios.post('/api/categories', category);
        dispatch(addNewCategory(res.data));
    } catch (error) {
        console.error(error);
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/categories/${id}`);
        dispatch(removeCategory(id));
    } catch (error) {
        console.error(error);
    }
}

/*
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
export const getSearchResults = (question) => async (dispatch) => {
	try {
		const res = await axios.get(`api/search/${question}`);
		console.log('dis!', res.data);
		dispatch(getLocations(res.data[0]));
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

*/

// REDUCER
export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_NEW_CATEGORY:
			return { ...state, categories: [ ...state.categories, action.category ] };
		case GET_CATEGORIES:
			return { ...state, categories: action.categories };
        case REMOVE_CATEGORY:
            let newCategoryArr = [...state.categories].filter(category => (category.id !== action.id));
            return {...state, categories: newCategoryArr};
		/*case UPDATE_LOCATION:
			let locations = [ ...state.locations ];
			let locationToUpdateIdx = locations.findIndex((location) => location.id === action.location.id);
			let updatedLocation = { ...locations[locationToUpdateIdx], ...action.location };
			locations[locationToUpdateIdx] = updatedLocation;
			return { ...state, locations };*/
		default:
			return state;
	}
}
